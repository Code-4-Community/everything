import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../../components/Hero';
import { ReactComponent as SVG } from './events.svg';

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  link: {},
});

const Events: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();

  const eventsDocsLink =
    'https://docs.google.com/document/d/1CbTWfAhkmy7l-BbuaZJ1lSIsheUOcVfQRaBQPGAZRH4/edit?usp=sharing';
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Events</title>
        <meta
          name="description"
          content="Upcoming events held by Code4Community."
        />
      </Helmet>
      <Alert severity="warning">
        <Typography variant="body1">
          There are currently no events planned for Fall 2021.
        </Typography>
      </Alert>
      <Hero
        title="Events"
        subtitle="Join our weekly events to grow your skills and learn more about Code4Community."
        SvgNode={SVG}
      />

      <Grid container>
        <Grid item md={6}>
          <Box pb={3}>
            <Typography variant="h6">About our events</Typography>
            <Typography variant="body1">
              Code4Community sponsors weekly events for all our club members. We
              hold general club events, company visits, panels/discussions, and
              web development workshops.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            href={eventsDocsLink}
            target="_blank"
            disabled
          >
            <Typography variant="h6">View the event schedule</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Events;
