import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import App from '../App';
import { createMockServer } from '../createMockServer';
import { Server } from 'miragejs';
import userEvent from '@testing-library/user-event';

describe('weather app tests', () => {
  let server: Server;

  beforeEach(() => {
    server = createMockServer();
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

    const input = screen.getByTestId('search-input'); // Corrected data-testid
    userEvent.type(input, 'Melbourne');

    const button = screen.getByTestId('search-button');
    userEvent.click(button);

    // Wait for the search results to appear
    await waitFor(() => {
      expect(screen.getByText(/Melbourne/i)).toBeInTheDocument();
      expect(screen.getByText(/22°C/i)).toBeInTheDocument();  // Adjust based on your app's output
      expect(screen.getByText(/Partly cloudy/i)).toBeInTheDocument();  // Adjust based on your app's output
    });

    // If you expect multiple elements related to the image or other data
    await waitFor(() => expect(screen.getAllByAltText(/Melbourne/i).length).toEqual(5));
  });
});
