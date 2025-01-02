// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormEvent, useCallback, useState } from 'react';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';

type Shortened = {
  original: string;
  short: string;
};

export function App() {
  const [inputUrl, setInputUrl] = useState<string>('');

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      console.log(event);
    },
    []
  );
  
  return (
    <div>
      <h1>My URL Shortener</h1>
      <p>{inputUrl}</p>
      <form onSubmit={onSubmit}>
        <label>URL</label>
        <input
          value={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
          placeholder="www.my-super-long-url-here.com/12345"
        />fuse
        <button type="submit">Generate</button>
      </form>
      <ul>
        <li>ex.co/abcde - www.example.com/this/is/a/long/slug</li>
      </ul>
    </div>
  );
}

export default App;
