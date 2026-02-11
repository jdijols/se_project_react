import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../Modals/ItemModal";
import AddItemModal from "../Modals/AddItemModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: "-", C: "-" },
    weatherCondition: "clouds",
    isDay: true,
  });

  const headerRef = useRef(null);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  function handleTempUnitChange() {
    if (currentTempUnit === "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  function handleOpenItemModal(card) {
    headerRef.current?.closeMenu();
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddClothesModal() {
    setActiveModal("add-clothes-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
    setTimeout(() => setSelectedCard({}), 300);
  }

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      handleCloseModal();
    }
  };

  function handleOpenConfirmationModal() {
    setActiveModal("confirm-delete-modal");
  }

  function handleDeleteItem() {
    deleteClothingItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id),
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleAddItemSubmit(inputValues, resetForm) {
    addClothingItem(inputValues)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
        resetForm();
      })
      .catch(console.error);
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleTempUnitChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            ref={headerRef}
            weatherData={weatherData}
            onAddClothes={handleOpenAddClothesModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                  onAddClothes={handleOpenAddClothesModal}
                />
              }
            />
          </Routes>

          <Footer />
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            onClose={handleCloseModal}
            onDeleteClick={handleOpenConfirmationModal}
            onOverlayClick={handleOverlayClick}
          />
          <ConfirmDeleteModal
            isOpen={activeModal === "confirm-delete-modal"}
            onClose={handleCloseModal}
            onConfirm={handleDeleteItem}
            onOverlayClick={handleOverlayClick}
          />
          <AddItemModal
            isOpen={activeModal === "add-clothes-modal"}
            onClose={handleCloseModal}
            onOverlayClick={handleOverlayClick}
            onAddItemSubmit={handleAddItemSubmit}
          />
        </div>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
