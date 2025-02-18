import { useEffect, useState } from "react";
import '@testing-library/jest-dom';

interface City {
  name: string;
  lat: number;
  lon: number;
}




interface WeatherCardProps {
  city: City;
}

interface Weather {
  temperature: number;
  main: any;
  
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const [weather, setWeather] = useState<Weather | null>(null);  // Defining the correct type for weather

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=YOUR_API_KEY`)
      .then((result) => result.json())  // Fixed typo: "result.json()" instead of "return.resut.json()"
      .then((data) => {
        setWeather({ temperature: data.main.temp, main: data.weather[0].main });  // Setting weather state with correct data
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error); // Optional: Handle errors
      });
  }, [city]);

  return (
    <div>
      <h3>{city.name}</h3>
      <p>{weather ? weather.temperature : "Loading..."}</p>  {/* Show loading if no weather data */}
      <p>{weather && weather.main}</p>
    </div>
  );
};

export default WeatherCard;
