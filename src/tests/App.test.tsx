import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { createMockServer } from '../mock/createMockServer';
import { Server } from 'miragejs';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import WeatherCard from '../components/weatherCard';
import Search from '../components/search';

let server: any;
beforeEach(() => {
  server = createMockServer();
});
afterEach(() => {
  server.shutdown();
});

 

describe('weather app tests', () => {

  it('renders app title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather Application/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('shows city search results', async () => {
    render(<App />);
  
    const input = screen.getByTestId('weather-search');
    
    // Simulate typing into the input field
    await userEvent.type(input, 'Melbourne');
  
    const button = screen.getByTestId('search-button');
  
    // Simulate clicking the search button
    await act(async () => {
      userEvent.click(button);
    });
  
    // Wait for the search results to appear
    await waitFor(() => {
      const cityElements = screen.getAllByText(/Melbourne/i);  // Case-insensitive match
      expect(cityElements.length).toBeGreaterThan(0);  // Ensure that Melbourne appears in the search results
  
    });
  });
  
  


  it('shows city search result details', async () => {
    render(<App />);
  
    const input = screen.getByTestId('weather-search');
    await userEvent.type(input, 'Melbourne');
  
    const button = screen.getByTestId('search-button');
    await userEvent.click(button);
  
    // Oota, kuni Melbourne ilmub
    const cityItems = await screen.findAllByTestId('city-item');
    expect(cityItems.length).toBeGreaterThan(0);
  
    // Kontrolli, kas üks element sisaldab "Melbourne"
    const melbourneCity = cityItems.find(item =>
      within(item).queryByText(/Melbourne/i)
    );
    expect(melbourneCity).toBeInTheDocument();
  

  });

  




  it('adds search result to my list', async () => {
    render(<App />);
    
    const input = screen.getByTestId('weather-search');
    
    // Simulate typing in the city name
    await userEvent.type(input, 'Melbourne');
    
    const button = screen.getByTestId('search-button');
    
    // Simulate clicking the search button
    await act(async () => {
      await userEvent.click(button);
    });
  
    // Wait for the city to appear in the "my weather list"
    const weatherList = await screen.findByTestId('my-weather-list');
    
    await waitFor(() => {
      // Verify that the list items are updated correctly
      const listItems = within(weatherList).getAllByTestId('city-item');
      expect(listItems.length).toBeGreaterThan(0); // Ensure "Melbourne" appears in the list
    });
  });
  
  
  
  
  
  

  
  
});

describe('WeatherCard component tests', () => {

  it('renders city name', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0
    };
    render(<WeatherCard city={city} />);
    expect(screen.getByText('Melbourne')).toBeInTheDocument();
  });

  it('renders temperature', async () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0
    };

    render(<WeatherCard city={city} />);

    const temperatureElement = await screen.findByTestId('temperature');
    expect(temperatureElement).toBeInTheDocument();
   // expect(temperatureElement).toHaveTextContent(/°C/i); 
    
  });

  it('renders when temp is not available', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0
    };

    render(<WeatherCard city={city} />);

    const temperatureElement = screen.getByText('Loading...');
    expect(temperatureElement).toBeInTheDocument();
  });

  it('renders weather type', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0
    };

    render(<WeatherCard city={city} />);

    const weatherTypeElement = screen.getByTestId('weather-type');
    expect(weatherTypeElement).toBeInTheDocument();
  });
});


describe('Search component tests', () => {

  it('displays search input and button', () => {
    render(<Search searchResults={[]} onSelectItem={() => {}} onSearch={() => {}} />);

    const input = screen.getByTestId('weather-search');
    const button = screen.getByTestId('search-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });


  it('displays city search results when a city is searched', async () => {
    const searchResults = [
      { name: 'Melbourne', lat: -37.8141705, lon: 144.9655616 },
      { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    ];

    render(<Search searchResults={searchResults} onSelectItem={() => {}} onSearch={() => {}} />);

    const cityElements = await screen.findAllByTestId('city-item');
    expect(cityElements.length).toBeGreaterThan(0);
    expect(cityElements[0]).toHaveTextContent('Melbourne');
  });
});
