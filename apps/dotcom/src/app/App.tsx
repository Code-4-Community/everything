import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Apply from './pages/apply/Apply';
import ApplyBrandDesigner from './pages/apply/brand-designer/ApplyBrandDesigner';
import ApplyDeveloper from './pages/apply/developer/ApplyDeveloper';
import ApplyProductDesigner from './pages/apply/product-designer/ApplyProductDesigner';
import ApplyProductManager from './pages/apply/product-manager/ApplyProductManager';
import Events from './pages/events/Events';
import Home from './pages/home/Home';
import NotFound from './pages/notfound/NotFound';
import People from './pages/people/People';
import Projects from './pages/projects/Projects';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta
          name="keywords"
          content="C4C,code,for,community,code4community,codeforcommunity,northeastern,boston"
        />
      </Helmet>

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" Component={Apply} />
          <Route path="/apply/developer" Component={ApplyDeveloper} />
          <Route
            path="/apply/product-manager"
            Component={ApplyProductManager}
          />
          <Route
            path="/apply/product-designer"
            Component={ApplyProductDesigner}
          />
          <Route path="/apply/brand-designer" Component={ApplyBrandDesigner} />
          <Route path="/projects" Component={Projects} />
          <Route path="/people" Component={People} />
          <Route path="*" Component={NotFound} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
