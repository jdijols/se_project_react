import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeIcon from "../../assets/like-default.svg";
import likeActiveIcon from "../../assets/like-active.svg";

function ItemCard({ data, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = data.likes?.some((id) => id === currentUser?._id);

  function handleOpenCard() {
    onCardClick(data);
  }

  function handleLike(evt) {
    evt.stopPropagation();
    onCardLike({ id: data._id, isLiked });
  }

  return (
    <li className="card" onClick={handleOpenCard}>
      <h2 className="card__title">{data.name}</h2>
      {isLoggedIn && (
        <button
          type="button"
          className={`card__like-btn${isLiked ? " card__like-btn_active" : ""}`}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <img
            src={isLiked ? likeActiveIcon : likeIcon}
            alt={isLiked ? "Liked" : "Not liked"}
            className="card__like-icon"
          />
        </button>
      )}
      <img src={data.imageUrl} alt={data.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
