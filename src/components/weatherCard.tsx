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
  const [error, setError] = useState<string | null>(null);

  const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;
  const kelvinToFahrenheit = (kelvin: number) => (kelvin - 273.15) * 9 / 5 + 32;

  useEffect(() => {
    if (city) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=f2c151d1a0880214af066c0088b05f96`)
        .then((result) => result.json())
        .then((data) => {
          if (data && data.main && data.weather) {
            setWeather({
              temperature: data.main.temp,
              main: data.weather[0].main,
            });
            setError(null); // Clear previous errors on successful data fetch
          } else {
            setError('Error: Invalid data format received'); 
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setError('Error fetching weather data');
        });
    }
  }, [city]);

  return (
    <div   className={`weather-container ${weather?.main?.toLowerCase() || ''}`}>
      {city ? (
        <div data-testid="wethr-cont">
          <h3>{city.name}</h3>
          <p data-testid="temperature" >{weather ? `${kelvinToCelsius(weather.temperature).toFixed(2)} °C` : 'Loading...'}</p>
          <p data-testid="weather-type" >{weather?.main || "No data"}</p>
        </div>
      ) : (
        <p>No city selected</p>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default WeatherCard;