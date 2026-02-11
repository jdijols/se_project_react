import "./Modal.css";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, onOverlayClick }) {
  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onOverlayClick}
    >
      <div className="modal__container modal__container_type_confirm">
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        ></button>
        <div className="modal__row_type_confirm">
          <h2 className="modal__text">
            Are you sure you want to delete this item?
          </h2>
          <p className="modal__text">This action is irreversible.</p>
        </div>
        <button className="modal__delete-btn" type="button" onClick={onConfirm}>
          Yes, delete item
        </button>
        <button className="modal__cancel-btn" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
