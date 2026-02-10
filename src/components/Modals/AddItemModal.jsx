import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

function AddItemModal({
  isOpen,
  handleCloseModal,
  handleOverlayClick,
  handleAddItemSubmit,
}) {
  const { values, handleChange, handleReset } = useForm({
    name: "",
    link: "",
    weather: "hot",
  });

  const isFormValid =
    values.name.trim().length >= 2 && values.link.trim() !== "";

  function handleSubmit(evt) {
    evt.preventDefault();
    handleAddItemSubmit(values, handleReset);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New clothing item"
      buttonText="Add item"
      name="add-clothes-form"
      onClose={handleCloseModal}
      handleOverlayClick={handleOverlayClick}
      isFormValid={isFormValid}
      handleSubmit={handleSubmit}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="add-item-name-input" className="modal__label">
          Name
          <input
            id="add-item-name-input"
            type="text"
            placeholder="Name"
            className="modal__input"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={30}
          />
        </label>
        <label htmlFor="add-item-image-input" className="modal__label">
          Image
          <input
            id="add-item-image-input"
            type="url"
            placeholder="Image URL"
            className="modal__input"
            name="link"
            value={values.link}
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>
      <fieldset className="modal__fieldset_type_radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>

        <div className="modal__radio-btn">
          <input
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label htmlFor="hot">Hot</label>
        </div>

        <div className="modal__radio-btn">
          <input
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label htmlFor="warm">Warm</label>
        </div>

        <div className="modal__radio-btn">
          <input
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label htmlFor="cold">Cold</label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
