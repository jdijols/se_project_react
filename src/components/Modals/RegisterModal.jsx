import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

function RegisterModal({
  isOpen,
  onClose,
  onOverlayClick,
  onRegister,
  onSwitchToLogin,
}) {
  const { values, errors, isValid, handleChange, handleReset } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values, handleReset);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      buttonText="Sign Up"
      name="register-form"
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      isFormValid={isValid}
      onSubmit={handleSubmit}
      altButton={
        <button
          type="button"
          className="modal__alt-btn"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      }
    >
      <fieldset className="modal__fieldset">
        <label
          htmlFor="register-email-input"
          className={`modal__label${errors.email ? " modal__label_error" : ""}`}
        >
          {errors.email ? `Email * (${errors.email})` : "Email *"}
          <input
            id="register-email-input"
            type="email"
            placeholder="Email"
            className={`modal__input${errors.email ? " modal__input_error" : ""}`}
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </label>
        <label
          htmlFor="register-password-input"
          className={`modal__label${errors.password ? " modal__label_error" : ""}`}
        >
          {errors.password ? `Password * (${errors.password})` : "Password *"}
          <input
            id="register-password-input"
            type="password"
            placeholder="Password"
            className={`modal__input${errors.password ? " modal__input_error" : ""}`}
            name="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
            required
            minLength={2}
          />
        </label>
        <label
          htmlFor="register-name-input"
          className={`modal__label${errors.name ? " modal__label_error" : ""}`}
        >
          {errors.name ? `Name * (${errors.name})` : "Name *"}
          <input
            id="register-name-input"
            type="text"
            placeholder="Name"
            className={`modal__input${errors.name ? " modal__input_error" : ""}`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={30}
          />
        </label>
        <label
          htmlFor="register-avatar-input"
          className={`modal__label${errors.avatar ? " modal__label_error" : ""}`}
        >
          {errors.avatar ? `Avatar URL * (${errors.avatar})` : "Avatar URL *"}
          <input
            id="register-avatar-input"
            type="url"
            placeholder="Avatar URL"
            className={`modal__input${errors.avatar ? " modal__input_error" : ""}`}
            name="avatar"
            autoComplete="url"
            value={values.avatar}
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default RegisterModal;
