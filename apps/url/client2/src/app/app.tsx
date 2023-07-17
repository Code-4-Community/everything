import { FormEvent, useCallback, useState } from 'react';
import axios from 'axios';

type Shortened = {
  original: string;
  short: string;
};

export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);
  const [inputUrl, setInputUrl] = useState<string>('');
  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });

      const newUrl = response.data as Shortened; // 🚨 This should set off alarm bells in your head! Why?

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
