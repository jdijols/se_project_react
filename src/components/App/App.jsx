import { useEffect, useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../Modals/ItemModal";
import FormModal from "../Modals/FormModal";

import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "-" });

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddClothesModal() {
    setActiveModal("add-clothes-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard({});
  }

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header
          weatherData={weatherData}
          handleOpenAddClothesModal={handleOpenAddClothesModal}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
        />
        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          onClose={handleCloseModal}
          handleOverlayClick={handleOverlayClick}
        />
        <FormModal
          isOpen={activeModal === "add-clothes-modal"}
          title="New clothing item"
          buttonText="Add item"
          name="add-clothes-form"
          onClose={handleCloseModal}
          handleOverlayClick={handleOverlayClick}
        >
          <fieldset className="modal__fieldset">
            <label htmlFor="add-item-name-input" className="modal__label">
              Name
              <input
                id="add-item-name-input"
                type="text"
                placeholder="Name"
                className="modal__input"
              />
            </label>
            <label htmlFor="add-item-image-input" className="modal__label">
              Image
              <input
                id="add-item-image-input"
                type="url"
                placeholder="Image URL"
                className="modal__input"
              />
            </label>
          </fieldset>
          <fieldset className="modal__fieldset_type_radio-btns">
            <legend className="modal__legend">Select the weather type:</legend>

            <div className="modal__radio-btn">
              <input type="radio" id="hot" name="weather" value="hot" />
              <label htmlFor="hot">Hot</label>
            </div>

            <div className="modal__radio-btn">
              <input type="radio" id="warm" name="weather" value="warm" />
              <label htmlFor="warm">Warm</label>
            </div>

            <div className="modal__radio-btn">
              <input type="radio" id="cold" name="weather" value="cold" />
              <label htmlFor="cold">Cold</label>
            </div>
          </fieldset>
        </FormModal>
      </div>
    </div>
  );
}

export default App;
