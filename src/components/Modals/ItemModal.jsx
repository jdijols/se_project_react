import "./Modal.css";

function ItemModal({ card, isOpen, onClose, onDeleteClick, onOverlayClick }) {
  function handleDeleteItem() {
    onDeleteClick(card);
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onOverlayClick}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        ></button>
        <img
          src={card?.imageUrl}
          alt={card?.name || ""}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__row_type_item">
            <h2 className="modal__text">{card.name}</h2>
            <button
              className="modal__delete-btn"
              type="button"
              onClick={handleDeleteItem}
            >
              Delete
            </button>
          </div>
          <p className="modal__text">
            Weather: <span className="modal__weather">{card.weather}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
