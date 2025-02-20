import React, { useState } from "react";
import WeatherCard from "./weatherCard";
import { City } from "../hooks/types";

const Search: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherList, setWeatherList] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<City | null>(null); // Lisatud result

  const fetchCityCoordinates = async (cityName: string) => {
    const API_KEY = "f2c151d1a0880214af066c0088b05f96";
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setError("City not found");
        return null;
      }

      return {
        name: data[0].name,
        lat: data[0].lat,
        lon: data[0].lon,
      };
    } catch (err) {
      setError("Error fetching city coordinates");
      return null;
    }
  };

  const handleSearch = async () => {
    if (!city) return;

    setError(null); // Tühjendame eelmise vea
    const newCity = await fetchCityCoordinates(city);

    if (newCity) {
      setResult(newCity); // Salvestame tulemuse result muutujasse
      setWeatherList([...weatherList, newCity]);
      setCity(""); // Tühjenda sisestusväli pärast otsingut
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        data-testid="weather-search"
      />
      <button onClick={handleSearch} data-testid="weather-search-btn">
        Search
      </button>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div data-testid="search-result">
          <h3>Search Result:</h3>
          <p>{result.name}</p>
          <p>Latitude: {result.lat}</p>
          <p>Longitude: {result.lon}</p>
        </div>
      )}

      <ul data-testid="my-weather-list">
        {weatherList.map((city) => (
          <li key={city.name}>
            <WeatherCard city={city} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
