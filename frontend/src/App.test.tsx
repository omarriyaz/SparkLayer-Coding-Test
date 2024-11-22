// npm install --save-dev @testing-library/react @testing-library/jest-dom
// npm install --save-dev @types/jest
// needed these to fix errors

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
