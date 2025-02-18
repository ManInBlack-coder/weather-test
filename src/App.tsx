import React, { useState } from "react";
import { createMockServer } from "./createMockServer";
import './components/search.css'
import WeatherCard from "./components/weatherCard";
import Search from "./components/search";
createMockServer();

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}   

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [selected, setSelected] = useState<City | null>(null);  // Set type to City | null

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const buttonClickHandler = async () => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`);
    const cities: City[] = await response.json();
    setSearchResults(cities); // Directly set the search results without using act()
  };

  const selectCity = (city: City) => {
    setSelected(city); // Select the city, no array needed
  };

  return (
    <div>
    <div className="App">
        <h2>Weather Application</h2>
        <input
          type="text"
          data-testid="search-input"
          value={query}
          onChange={inputChangeHandler}
        />
        <button data-testid="search-button" onClick={buttonClickHandler}>
          Search
        </button>

        <div data-testid="search-results">
          {searchResults.map((city) => (
            <div
              key={`${city.lat}-${city.lon}`}
              onClick={() => selectCity(city)}>
              {city.name}, {city.lat}, {city.lon}
            </div>
          ))}
        </div>

        <div data-testid="my-weather-list">
          <h3>Selected city: </h3>
          {selected ? (
            <div key={`${selected.lat}-${selected.lon}`}>{selected.name}</div>
          ) : (
            <div>No city selected</div>
          )}
        </div>
      </div> 
    
    </div>
  );
}

export default App;
