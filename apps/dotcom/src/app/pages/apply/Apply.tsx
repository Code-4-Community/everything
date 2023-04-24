import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Box } from '@material-ui/core';
import ApplyGrid from './ApplyGrid';
import Hero from '../../components/Hero';
import { ReactComponent as SVG } from './team.svg';

const Apply: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Apply</title>
        <meta
          name="description"
          content="Apply to join Code4Community and help create software for non-profits in Boston."
        />
      </Helmet>

      {/*TODO: Uncomment after applications close*/}
      {/*<Alert severity="info">*/}
      {/*  Our applications are closed. Stay tuned for our next application cycle by joining our mailing list <a href="https://c4cneu.us4.list-manage.com/subscribe?u=4b534cd2e8fe8be8150d03977&id=b1915b8b8b">here</a>.*/}
      {/*</Alert>*/}

      <Hero
        title="Open Positions"
        subtitle="Join us and make a difference helping non-profits in need."
        SvgNode={SVG}
      />
      <Box paddingBottom={'10em'}>
        <ApplyGrid />
      </Box>
    </Container>
  );
};

export default Apply;
