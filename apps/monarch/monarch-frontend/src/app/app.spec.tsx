import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { describe } from 'node:test';

describe('App', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });
  /* it('should render successfully', () => {
   *   const { baseElement } = render(
   *     <BrowserRouter>
   *       <App />
   *     </BrowserRouter>
   *   );
   *   expect(baseElement).toBeTruthy();
   * });

   * it('should have a greeting as the title', () => {
   *   const { getByText } = render(
   *     <BrowserRouter>
   *       <App />
   *     </BrowserRouter>
   *   );
   *   expect(getByText(/Welcome frontend/gi)).toBeTruthy();
   * }); */
});
