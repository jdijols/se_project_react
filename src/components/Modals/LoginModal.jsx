import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

function LoginModal({
  isOpen,
  onClose,
  onOverlayClick,
  onLogin,
  onSwitchToRegister,
  loginError,
}) {
  const { values, errors, isValid, handleChange, handleReset } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values, handleReset);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log In"
      buttonText="Log In"
      name="login-form"
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      isFormValid={isValid}
      onSubmit={handleSubmit}
      altButton={
        <button
          type="button"
          className="modal__alt-btn"
          onClick={onSwitchToRegister}
        >
          or Sign Up
        </button>
      }
    >
      <fieldset className="modal__fieldset">
        <label
          htmlFor="login-email-input"
          className={`modal__label${errors.email ? " modal__label_error" : ""}`}
        >
          {errors.email ? `Email * (${errors.email})` : "Email *"}
          <input
            id="login-email-input"
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
          htmlFor="login-password-input"
          className={`modal__label${errors.password ? " modal__label_error" : ""}`}
        >
          {loginError
            ? "Incorrect password"
            : errors.password
              ? `Password * (${errors.password})`
              : "Password *"}
          <input
            id="login-password-input"
            type="password"
            placeholder="Password"
            className={`modal__input${errors.password ? " modal__input_error" : ""}`}
            name="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            required
            minLength={2}
          />
        </label>
        {loginError && (
          <span className="modal__error modal__error_visible">
            Email or password incorrect
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default LoginModal;
