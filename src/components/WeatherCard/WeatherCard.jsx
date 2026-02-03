import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import { weatherConditionImages } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  return (
    <section className="weather-card">
      <img
        src={
          weatherConditionImages[weatherData.isDay ? "day" : "night"][
            weatherData.weatherCondition
          ]?.image
        }
        alt={`${weatherData.weatherCondition} weather`}
        className="weather-card__image"
      />
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnit]}&deg; {currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
