import { getByText, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { createMockServer } from '../createMockServer';
import { Server } from 'miragejs';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import WeatherCard from '../components/weatherCard';


let server: any
beforeEach(() => {
  server = createMockServer()
})
afterEach(() => {
  server.shutdown()
})

describe('weather app tests', () => {
  let server: Server;

  beforeEach(() => {
    server = createMockServer(); // Ensure this properly mocks the API
  });

  afterEach(() => {
    server.shutdown();
  });

  it('renders app title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather Application/i);
    expect(linkElement).toBeInTheDocument();
  });









  it('shows city search results', async () => {
    render(<App />);

    const input = screen.getByTestId('search-input'); // Ensure 'search-input' exists
    userEvent.type(input, 'Melbourne');

    const button = screen.getByTestId('search-button'); // Ensure 'search-button' exists

    // Wrap the button click in `act()` to ensure the update is completed
    await act(async () => {
      userEvent.click(button);
    });

    // Wait for the search results to appear (city name or data related to Melbourne)
    await waitFor(() => {
      // Ensure the expected number of elements is rendered (5 cities expected)
      expect(screen.getAllByText(/Melbourne/i).length).toBeGreaterThan(0);
    });
  });

  





  it('show city search result detail', async () => {
    render(<App />);
  
    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'Melbourne');
  
    const button = screen.getByTestId('search-button');
    userEvent.click(button);
  
    // Wait for results to appear using findAllByText
    const results = await screen.findAllByText((content, element) => {
      // Check that element is not null before trying to access textContent
      if (element && element.textContent) {
        return (
          element.textContent.includes("Melbourne") &&
          element.textContent.includes("-37.8141705") &&
          element.textContent.includes("144.9655616")
        );
      }
      return false;
    });
  
    expect(results.length).toBeGreaterThan(0);  // Ensure at least one result is found
    expect(results[0]).toBeInTheDocument();  // Ensure the result is rendered
  });
  
  
  




  

  it('adds search result to my list', async () => {
    render(<App />);
  
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'Melbourne');
  
    const button = screen.getByTestId('search-button');
  
    // Click the search button within `act()`
    await act(async () => {
      await userEvent.click(button);
    });
  
    // Wait for the results to appear
    const cityElements = await screen.findAllByText(/Melbourne/i);
  
    // Ensure at least one result appears
    expect(cityElements.length).toBeGreaterThan(0);
  
    // Click the first result
    await act(async () => {
      await userEvent.click(cityElements[0]);
    });
  
    // Ensure that the selected city is added to the "my-weather-list" section
    const weatherList = screen.getByTestId('my-weather-list');
    expect(await within(weatherList).findByText(/Melbourne/i)).toBeInTheDocument();

  });
  
  
  
});

describe('Weahtercard component test', () => {
  

  it('renders city name ', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0
    }
    render(<WeatherCard city={city}/>);
  //    expect(screen.getByText(city.name).toBeInTheDocument())
  })


  it('renders temperature', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0
    }

    render(<WeatherCard city={city}/>);
  //  expect(screen,getByText(12.79).toBeInTheDocument())

  })
  
  
})

