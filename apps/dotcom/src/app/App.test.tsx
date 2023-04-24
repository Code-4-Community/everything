import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
// i.e. `.toBeVisible`
import '@testing-library/jest-dom';

test('renders learn react link', async () => {
  const { findByText } = render(<App />);
  expect(await findByText(/software solutions/i)).toBeVisible();
});
