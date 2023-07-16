// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useCallback, useState } from 'react';
import axios from 'axios';
import { Container, Text, Box } from '@chakra-ui/react';
import ShortenUrlForm from './ShortenUrlForm';
import { Shortened } from './types';
import UrlList from './UrlList';

export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);

  const requestShortUrl = useCallback(
    async (inputUrl: string) => {
      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });

      const newUrl = response.data as Shortened;
      console.log(response);
      if (urls.some((shortened) => shortened.original === newUrl.original))
        return;

      setUrls([newUrl, ...urls]);
    },
    [urls, setUrls]
  );

  const onSubmitQr = {};

  return (
    <Box
      position="relative"
      bottom={10}
      bgGradient={[
        'linear(to-tr,teal.300, yellow.400)',
        'linear(to-t,blue.200, teal.500)',
        'linear(to-b,orange.100, purple.300)',
      ]}
      w="100%"
      minHeight="100vh"
    >
      <Container
        maxWidth="4xl"
        marginBlock={10}
        textAlign="center"
        position="relative"
        top={20}
      >
        <Text fontSize="4xl" color="teal" fontWeight="bold">
          My URL Shortener
        </Text>
        <ShortenUrlForm requestShortUrl={requestShortUrl} />
      </Container>{' '}
      <Container
        display="flex"
        justifyContent="center"
        position="relative"
        top={20}
      >
        <UrlList urls={urls} onSubmitQr={onSubmitQr} />
      </Container>
    </Box>
  );
}

export default App;
