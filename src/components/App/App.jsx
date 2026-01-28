import { useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";

import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard({});
  }

  return (
    <div className="app">
      <Header />
      <Main
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
      />
      <Footer />
      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "item-modal"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
