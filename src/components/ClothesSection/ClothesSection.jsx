import "./ClothesSection.css";
import "../Header/Header.css";
import "../Main/Main.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick, onAddClothes }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        Your items:
        <button
          className="clothes-section__add-clothes-btn header__add-clothes-btn"
          onClick={onAddClothes}
        >
          + Add clothes
        </button>
      </div>
      <ul className="clothes-section__card-list main__card-list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} data={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
