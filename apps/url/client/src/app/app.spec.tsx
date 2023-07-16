import { render, screen } from '@testing-library/react';

import UrlList from './urlList';
import { Shortened } from './types';

describe('UrlList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UrlList urls={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should contain the list of URLs provided', () => {
    const urls: Array<Shortened> = [
      { original: 'https://c4cneu.com', short: 'http://short.com/s/0' },
    ];

    render(<UrlList urls={urls} />);
    expect(screen.getByText(urls[0].original, { exact: false })).toBeTruthy();
    expect(screen.getByText(urls[0].short, { exact: false })).toBeTruthy();
  });
});
