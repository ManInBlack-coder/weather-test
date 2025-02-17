import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import App from './App';

test('should render weather app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather Application/i);
  expect(linkElement).toBeInTheDocument();
});
