import React, { useState } from "react";
import { City } from "../hooks/types";
import './search.css';

interface SearchProps {
  searchResults: City[];
  onSelectItem: (city: City) => void;
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchResults, onSelectItem, onSearch }) => {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!city.trim()) return;
    setError(null);
    onSearch(city);
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
      <button onClick={handleSearch} data-testid="search-button">
        Search
      </button>

      {error && <p className="error-message">{error}</p>}

      <ul data-testid="my-weather-list">
        {searchResults.map((city) => (
          <li data-testid="city-item" key={city.name}  onClick={() => onSelectItem(city)} >
          
            <p>{city.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
