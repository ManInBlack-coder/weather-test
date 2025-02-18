import React, { useState, useEffect } from "react";
import { City } from "../hooks/types";
import './weatherCard.css';

interface WeatherCardProps {
  city: City;
}

interface Weather {
  temperature: number;
  main: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    if (city) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=f2c151d1a0880214af066c0088b05f96`)
        .then((result) => result.json())
        .then((data) => {
          setWeather({
            temperature: data.main.temp,
            main: data.weather[0].main,
          });
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [city]);

  return (
    <div className={`weather-container ${weather?.main.toLowerCase() === 'clouds' ? 'clouds' : ''}`}>
      {city ? (
        <>
          <h3>{city.name}</h3>
          <p>{weather ? weather.temperature : "-/-"}</p>
          <p>{weather && weather.main}</p>
        </>
      ) : (
        <p>No city selected</p>
      )}
    </div>
  );
};

export default WeatherCard;
