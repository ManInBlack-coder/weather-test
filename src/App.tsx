import React, { useState } from "react";
import './app.css';
import Search from "./components/search";
import WeatherCard from "./components/weatherCard";
import { City } from "./hooks/types";

import {mount} from 'cypress/react'

function App() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Handle search button click in parent
  const buttonClickHandler = async (query: string) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=YOUR_API_KEY`);
    const cities: City[] = await response.json();
    setSearchResults(cities); // Set the results
  };

  const selectCity = (city: City) => {
    setSelectedCity(city); // Select the city
    setSearchResults([]);  // Clear search results after selection
  };

  return (
    <div className="App">
      <h2>Weather Application</h2>

      {/* Pass the onSearch prop to trigger search in Search component */}
      <Search 
        searchResults={[searchResults]}
        onSelectItem={selectCity} 
        onSearch={buttonClickHandler} 
      />

      {/* Weather Information */}
      <div className="weather-info">
        {selectedCity ? (
          // Pass the full `city` object, not just lat and lon
          <WeatherCard city={selectedCity} />
        ) : (
          <p>No city selected</p>
        )}
      </div>
    </div>
  );
}

export default App;
