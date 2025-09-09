import axios from "axios";

const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

const getAllWeatherData = (lat, lon) =>
  axios
    .get(
      `${baseUrl}?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    )
    .then((res) => res.data)
    .catch((error) => {
      console.log("error fetching weather data:", error.message);
    });

// export default { getWeather, getMain, getWind };
export default { getAllWeatherData };
