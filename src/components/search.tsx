import React, { useState } from "react";
import './components/search.css'

interface City {
  name: string;
  lat: number;
  lon: number;
}

interface SearchProps {
  searchResults: City[];
  onSelectItem: (city: City) => void;
}

const Search: React.FC<SearchProps> = ({ searchResults, onSelectItem }) => {
  // Loon uue state'i, et hallata otsingutulemusi
  const [results, setSearchResults] = useState<City[]>(searchResults);

  const onSelect = (city: City) => {
    onSelectItem(city);
    setSearchResults([]); // Õige viis tühjendada tulemused
  }

  return (
    <div className="search-container">
      <div className="input-container">
        <input type="text" data-testid="search-input" />
        <button data-testid="search-button" className="search-results">Search</button>

        {/* Kuvame otsingutulemused */}
        <div data-testid="search-results" className="search-result">
          {results.map((city) => (
            <div
              key={`${city.lat}-${city.lon}`}
              onClick={() => onSelect(city)} // Kasutame `onSelect` funktsiooni
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
