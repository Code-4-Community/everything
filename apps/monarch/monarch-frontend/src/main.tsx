import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SearchTherapists } from './app/SearchTherapists';
import { ChakraProvider } from '@chakra-ui/react';
import AdminPage from './app/AdminPage';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <main style={{ display: 'block', maxWidth: 1080, marginInline: 'auto' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SearchTherapists accessToken=''/>} />
            </Routes>
            <Routes>
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </BrowserRouter>
        </main>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
