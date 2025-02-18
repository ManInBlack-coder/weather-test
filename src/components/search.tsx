import React, { useState } from "react";
import './search.css';

interface City {
  name: string;
  lat: number;
  lon: number;
}

interface SearchProps {
  searchResults: City[];
  onSelectItem: (city: City) => void;
  onSearch: (query: string) => void; // Add the onSearch prop to trigger the search
}

const Search: React.FC<SearchProps> = ({ searchResults, onSelectItem, onSearch }) => {
  const [results, setSearchResults] = useState<City[]>(searchResults);
  const [query, setQuery] = useState<string>("");

  // Handle input change
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const buttonClickHandler = async () => {
    const apiKey = 'f2c151d1a0880214af066c0088b05f96'; // Replace with your actual API key
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`);
    if (!response.ok) {
      console.error('Failed to fetch cities');
      return; // You were missing a return here to prevent further execution
    }
    const cities: City[] = await response.json();
    setSearchResults(cities);
  };
  
  
  

  const onSelect = (city: City) => {
    onSelectItem(city); // Call onSelectItem passed from parent
    setSearchResults([]); // Clear the search results after selection
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <input 
          type="text" 
          data-testid="search-input" 
          value={query}
          onChange={inputChangeHandler} // Update the query state as user types
        />
        <button 
          data-testid="search-button" 
          className="search-results"
          onClick={buttonClickHandler} // Trigger search on button click
        >
          Search
        </button>

        <div data-testid="search-results" className="search-result">
          {results.map((city) => (
            <div
              key={`${city.lat}-${city.lon}`}
              onClick={() => onSelect(city)} 
              className="city-item"
            >
              <span className="city-name">{city.name}</span>
              <span className="city-location">{city.lat}, {city.lon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
