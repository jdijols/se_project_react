import cloudyDay from "../../assets/cloudy-day.svg";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather-card">
      <img src={cloudyDay} alt="Cloudy Day" className="weather-card__image" />
      <p className="weather-card__temp">75&deg; F</p>
    </section>
  );
}

export default WeatherCard;
