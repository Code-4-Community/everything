import { useCallback, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Text
} from '@chakra-ui/react';
import ShortenUrlForm from './ShortenUrlForm';
import UrlList from './UrlList';
import { Shortened } from './types';

export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);

  const requestShortUrl = useCallback(
    async (inputUrl: string) => {
      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });

      const newUrl = response.data as Shortened;

      setUrls([newUrl, ...urls]);
    },
    [urls, setUrls]
  );

  return (
    <Container marginBlock={10} textAlign="center" bg='pink.100'>
    <Text fontFamily = 'montserrat' fontSize="4xl"> My URL Shortener! </Text>
    <ShortenUrlForm requestShortUrl={requestShortUrl} />
    <UrlList urls={urls} />
  </Container>
  );
}


