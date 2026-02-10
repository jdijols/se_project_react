import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../Modals/ItemModal";
import AddItemModal from "../Modals/AddItemModal";

import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";
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

  function handleAddItemSubmit(inputValues, resetForm) {
    const newItem = { _id: Date.now(), ...inputValues };
    setClothingItems([newItem, ...clothingItems]);
    handleCloseModal();
    resetForm();
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
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
            handleOpenAddClothesModal={handleOpenAddClothesModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  handleOpenAddClothesModal={handleOpenAddClothesModal}
                />
              }
            />
          </Routes>

          <Footer />
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            onClose={handleCloseModal}
            handleOverlayClick={handleOverlayClick}
          />
          <AddItemModal
            isOpen={activeModal === "add-clothes-modal"}
            handleCloseModal={handleCloseModal}
            handleOverlayClick={handleOverlayClick}
            handleAddItemSubmit={handleAddItemSubmit}
          />
        </div>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
