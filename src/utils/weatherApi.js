import { apiKey, coordinates } from "./constants";

const getConditionKey = (conditionId) => {
  if (!conditionId) return "clouds";
  if (conditionId >= 200 && conditionId < 300) return "storm";
  if (conditionId >= 300 && conditionId < 600) return "rain";
  if (conditionId >= 600 && conditionId < 700) return "snow";
  if (conditionId >= 700 && conditionId < 800) return "fog";
  if (conditionId === 800) return "clear";
  if (conditionId > 800 && conditionId < 900) return "clouds";
  return "clouds";
};

export function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`,
  )
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Error from weather API: ${res.status}`);
    })
    .then((data) => {
      return parseWeatherData(data);
    });
}

function parseWeatherData(data) {
  const parsedData = {
    temp: {},
    weatherCondition: "",
    isDay: true,
  };

  parsedData.city = data.name;

  parsedData.temp.F = Math.round(data.main.temp);
  parsedData.temp.C = Math.round(((parsedData.temp.F - 32) * 5) / 9);

  parsedData.weatherCondition = getConditionKey(data.weather?.[0]?.id);

  parsedData.isDay = isDay(data.sys.sunrise, data.sys.sunset, data.dt);

  return parsedData;
}

function isDay(sunrise, sunset, timeStamp) {
  return sunrise < timeStamp && timeStamp < sunset;
}
