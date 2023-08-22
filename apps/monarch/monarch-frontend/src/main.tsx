import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SearchTherapists } from './app/SearchTherapists';
import ManageTherapists from './app/ManageTherapists';
import { ChakraProvider, Switch } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <main
          style={{ display: 'block', maxWidth: 1080, marginInline: 'auto' }}
        >
        <BrowserRouter>
          <Tabs>
            <TabList>
              <Tab>
                <Link to="/">Search</Link>
              </Tab>
              <Tab>
                <Link to="/admin">Manage</Link>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Switch>
                  <Routes>
                    <Route path="/" element={<SearchTherapists />} />
                  </Routes>
                  <Routes>
                    <Route path="/admin" element={<ManageTherapists />} />
                  </Routes>
                </Switch>
              </TabPanel>
            </TabPanels>
          </Tabs>


            {/* <Routes>
              <Route path="/" element={<SearchTherapists />} />
            </Routes>
            <Routes>
              <Route path="/admin" element={<ManageTherapists />} />
            </Routes> */}
          </BrowserRouter>
        </main>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
