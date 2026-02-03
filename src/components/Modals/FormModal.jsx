import "./Modal.css";

function FormModal({
  isOpen,
  children,
  handleSubmit,
  title,
  buttonText,
  name,
  onClose,
  handleOverlayClick,
}) {
  return (
    <div
      className={`modal modal_type_${name}${isOpen ? " modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container modal__container_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        ></button>
        <form onSubmit={handleSubmit} name={name} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
