import { useState, useCallback } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { value, name, validationMessage } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(event.target.closest("form").checkValidity());
  };

  const resetValidation = useCallback(() => {
    setErrors({});
    setIsValid(false);
  }, []);

  const handleReset = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  }, [defaultValues]);

  return {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
    setIsValid,
    handleReset,
    resetValidation,
  };
}
