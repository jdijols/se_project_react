import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

function AddItemModal({ isOpen, onClose, onOverlayClick, onAddItemSubmit }) {
  const { values, errors, isValid, handleChange, handleReset } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItemSubmit(values, handleReset);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New clothing item"
      buttonText="Add item"
      name="add-clothes-form"
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      isFormValid={isValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__fieldset">
        <label
          htmlFor="add-item-name-input"
          className={`modal__label${errors.name ? " modal__label_error" : ""}`}
        >
          {errors.name ? `Name * (${errors.name})` : "Name *"}
          <input
            id="add-item-name-input"
            type="text"
            placeholder="Name"
            className={`modal__input${errors.name ? " modal__input_error" : ""}`}
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={30}
          />
        </label>
        <label
          htmlFor="add-item-image-input"
          className={`modal__label${errors.imageUrl ? " modal__label_error" : ""}`}
        >
          {errors.imageUrl ? `Image * (${errors.imageUrl})` : "Image *"}
          <input
            id="add-item-image-input"
            type="url"
            placeholder="Image URL"
            className={`modal__input${errors.imageUrl ? " modal__input_error" : ""}`}
            name="imageUrl"
            value={values.imageUrl}
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
