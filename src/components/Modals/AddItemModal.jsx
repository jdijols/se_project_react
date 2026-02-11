import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

function AddItemModal({ isOpen, onClose, onOverlayClick, onAddItemSubmit }) {
  const { values, handleChange, handleReset } = useForm({
    name: "",
    imageUrl: "",
    weather: "Hot",
  });

  const isFormValid =
    values.name.trim().length >= 2 && values.imageUrl.trim() !== "";

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
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
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
            id="Hot"
            name="weather"
            value="Hot"
            checked={values.weather === "Hot"}
            onChange={handleChange}
          />
          <label htmlFor="Hot">Hot</label>
        </div>

        <div className="modal__radio-btn">
          <input
            type="radio"
            id="Warm"
            name="weather"
            value="Warm"
            checked={values.weather === "Warm"}
            onChange={handleChange}
          />
          <label htmlFor="Warm">Warm</label>
        </div>

        <div className="modal__radio-btn">
          <input
            type="radio"
            id="Cold"
            name="weather"
            value="Cold"
            checked={values.weather === "Cold"}
            onChange={handleChange}
          />
          <label htmlFor="Cold">Cold</label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
