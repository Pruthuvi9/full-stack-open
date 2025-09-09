import { useEffect, useState } from "react";
import weatherService from "../services/weatherService";

const ICON_URL = "https://openweathermap.org/img/wn";

const Weather = ({ country }) => {
  const { capital } = country;
  const lat = country.latlng[0];
  const lon = country.latlng[1];
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    weatherService.getAllWeatherData(lat, lon).then((data) => {
      setWeatherData(data);
    });
  }, []);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      {weatherData && (
        <>
          <p>
            Temperature{" "}
            {`${Number(weatherData.main.temp - 273.15).toFixed(2)} Celcius`}
          </p>
          <img src={`${ICON_URL}/${weatherData.weather[0].icon}@2x.png`} />
          <p>Wind {`${weatherData.wind.speed} m/s`}</p>
        </>
      )}
    </div>
  );
};

export default Weather;
