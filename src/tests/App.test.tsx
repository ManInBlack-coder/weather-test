import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { createMockServer } from '../createMockServer';
import { Server } from 'miragejs';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

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
      // Ensure the expected number of elements is rendered
      expect(screen.getByText(/Melbourne/i)).toBeInTheDocument();
    });
  });


  it('show city search result detail', async () => {
    render(<App/>)

    const input = screen.getByTestId('search-input')
    userEvent.type(input,'Melbourne')
    
    const button  = screen.getByTestId('search-button')
    userEvent.click(button)

    await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5))
    expect(screen.getByText(/Melbourne, -37.8141705, 144.9655616/i)).toBeInTheDocument()


  })
  

  it('add search result to my list', async () => {
    render(<App />);

    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'Melbourne');

    const button = screen.getByTestId('search-button');

    // Wrap the button click in `act()` to ensure the update is completed
    await act(async () => {
      userEvent.click(button);
    });

    // Wait for the results to appear
    await waitFor(() => {
      expect(screen.getByText(/Melbourne/i)).toBeInTheDocument();
    });

    // Select the first city from the search results (use the city's name or other identifier)
    const cityElement = screen.getByText(/Melbourne/i); // Adjust if necessary
    act(() => {
      userEvent.click(cityElement); // Simulate clicking the city to select it
    });

    // Ensure that the search result is added to the "my-weather-list" section
    const weatherList = screen.getByTestId('my-weather-list');
    expect(within(weatherList).getByText(/Melbourne/i)).toBeInTheDocument();
  });
});
