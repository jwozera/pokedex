import { render, screen } from '@testing-library/react';
import App from './App';

it('expect title to show up', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
