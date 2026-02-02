import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ clothingItems, handleOpenItemModal, weatherData }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData}/>
      <p className="main__text">Today is {weatherData.temp}° F / You may want to wear:</p>
      <ul className="main__card-list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
