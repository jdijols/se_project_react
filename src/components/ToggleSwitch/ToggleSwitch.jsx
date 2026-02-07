import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch({ onToggle }) {
  const { currentTempUnit, handleTempUnitChange } = useContext(
    CurrentTempUnitContext,
  );

  const handleChange = (e) => {
    handleTempUnitChange(e);
    onToggle?.();
  };

  return (
    <label htmlFor="toggle-switch" className="toggle-switch">
      <input
        id="toggle-switch"
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={currentTempUnit === "C"}
        onChange={handleChange}
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__value toggle-switch__value_left">F</span>
      <span className="toggle-switch__value toggle-switch__value_right">C</span>
    </label>
  );
}

export default ToggleSwitch;
