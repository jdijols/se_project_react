import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

function EditProfileModal({
  isOpen,
  onClose,
  onOverlayClick,
  onEditProfile,
  currentUser,
}) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
    setIsValid,
    handleReset,
    resetValidation,
  } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
      resetValidation();
      setIsValid(currentUser.name?.trim().length >= 2);
    }
  }, [isOpen, currentUser, setValues, resetValidation, setIsValid]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onEditProfile(values, handleReset);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Change profile data"
      buttonText="Save changes"
      name="edit-profile-form"
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      isFormValid={isValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__fieldset">
        <label
          htmlFor="edit-name-input"
          className={`modal__label${errors.name ? " modal__label_error" : ""}`}
        >
          {errors.name ? `Name * (${errors.name})` : "Name *"}
          <input
            id="edit-name-input"
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
          htmlFor="edit-avatar-input"
          className={`modal__label${errors.avatar ? " modal__label_error" : ""}`}
        >
          {errors.avatar ? `Avatar URL * (${errors.avatar})` : "Avatar URL *"}
          <input
            id="edit-avatar-input"
            type="url"
            placeholder="Avatar URL"
            className={`modal__input${errors.avatar ? " modal__input_error" : ""}`}
            name="avatar"
            value={values.avatar}
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default EditProfileModal;
