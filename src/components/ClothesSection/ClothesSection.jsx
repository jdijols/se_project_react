import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClothes,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        Your items:
        <button
          className="clothes-section__add-clothes-btn"
          onClick={onAddClothes}
        >
          + Add clothes
        </button>
      </div>
      <ul className="clothes-section__card-list">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            data={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
