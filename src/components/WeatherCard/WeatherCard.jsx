import cloudyDay from "../../assets/cloudy-day.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <img src={cloudyDay} alt="Cloudy Day" className="weather-card__image" />
      <p className="weather-card__temp">{weatherData.temp}&deg; F</p>
    </section>
  );
}

export default WeatherCard;
