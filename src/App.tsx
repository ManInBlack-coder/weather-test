import React, { useState } from "react";
import './app.css';
import Search from "./components/search";
import WeatherCard from "./components/weatherCard";
import { City } from "./hooks/types";

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const fetchCityCoordinates = async (cityName: string) => {
    const API_KEY = "f2c151d1a0880214af066c0088b05f96";
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.length === 0) return [];

      return data.map((city: any) => ({
        name: city.name,
        lat: city.lat,
        lon: city.lon,
      }));
    } catch (err) {
      console.error("Error fetching city coordinates", err);
      return [];
    }
  };

  const handleSearch = async (query: string) => {
    const cities = await fetchCityCoordinates(query);
    setSearchResults(cities);
  };

  const selectCity = (city: City) => {
    setSelectedCity(city);
    setSearchResults([]); // Clear the search results once a city is selected
  };

  return (
    <div className="App">
      <h2>Weather Application</h2>

      <Search 
        searchResults={searchResults} 
        onSelectItem={selectCity} 
        onSearch={handleSearch} 
      />

      <div className="weather-info">
        {selectedCity ? (
          <WeatherCard city={selectedCity} />
        ) : (
          <p>No city selected</p>
        )}
      </div>
    </div>
  );
};

export default App;
