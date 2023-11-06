import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapPage from './pages/mapPage/MapPage';
import AdoptedPage from './pages/mapPage/AdoptedPage';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/adopted" element={<AdoptedPage />} />
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
