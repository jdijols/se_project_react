import "./Modal.css";

function ModalWithForm({
  isOpen,
  children,
  onSubmit,
  title,
  buttonText,
  name,
  onClose,
  onOverlayClick,
  isFormValid,
}) {
  return (
    <div
      className={`modal modal_type_${name}${isOpen ? " modal_is-opened" : ""}`}
      onClick={onOverlayClick}
    >
      <div className="modal__container modal__container_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        ></button>
        <form onSubmit={onSubmit} name={name} className="modal__form">
          {children}
          <button
            type="submit"
            className="modal__submit-btn"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
