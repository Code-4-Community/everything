import React from 'react';
import { Helmet } from 'react-helmet';

import { Container } from '@material-ui/core';
import Hero from '../../components/Hero';
import { ReactComponent as SVG } from './404.svg';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>404 : Page Not Found</title>
      </Helmet>
      <Hero
        title="Page not found"
        subtitle="Oops! Sorry, we couldn't find the page you're looking for."
        SvgNode={SVG}
      />
    </Container>
  );
};

export default NotFound;
