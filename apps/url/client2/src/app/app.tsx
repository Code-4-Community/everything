import { FormEvent, useCallback, useState } from 'react';

type Shortened = {
  original: string;
  short: string;
};

export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);
  const [inputUrl, setInputUrl] = useState<string>('');
  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const newUrl: Shortened = {
        original: inputUrl,
        short: 'short.com/123',
      };

      setUrls([newUrl, ...urls]);
      setInputUrl('');
    },
    [urls, setUrls, inputUrl, setInputUrl]
  );
  return (
    <div>
      <h1>My URL Shortener</h1>
      <form onSubmit={onSubmit}>
        <label>URL</label>
        <input
          value={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
          placeholder="www.my-super-long-url-here.com/12345"
        />
        <button type="submit">Generate</button>
      </form>

      <ul>
        {urls.map((u) => (
          <li>
            {u.short} - {u.original}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
