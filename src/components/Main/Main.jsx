import "./Main.css";
import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ clothingItems, onCardClick, weatherData }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const temp =
    currentTempUnit === "F" ? weatherData.temp.F : weatherData.temp.C;

  const getWeatherType = (tempF) => {
    if (tempF >= 86) return "hot";
    if (tempF >= 66) return "warm";
    return "cold";
  };

  const weatherType = getWeatherType(weatherData.temp.F);

  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherType,
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {temp}° {currentTempUnit} / You may want to wear:
      </p>
      <ul className="main__card-list">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id}
            data={item}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
