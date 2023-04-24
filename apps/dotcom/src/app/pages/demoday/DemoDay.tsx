import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../../components/Hero';
import ProjectCard from '../projects/ProjectCard';
import { projects } from '../projects/ProjectJSON';
import { ReactComponent as SVG } from './demoday.svg';

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
    margin: 16,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailLine: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLine: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  infoText: {
    marginTop: '0.5em',
    fontStyle: 'italic',
  },
  icon: {
    paddingTop: 5,
    paddingBottom: 5,
    width: 25,
    height: 25,
    marginLeft: '0.5em',
    marginRight: '0.5em',
    backgroundColor: 'white',
  },
  projectImg: {
    height: '160px',
    objectFit: 'contain',
    transition: 'transform .2s',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
});

const DemoDay: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();

  const rsvpLink = 'https://forms.gle/eX4qspbypvKVVfEM7';
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Demo Day</title>
        <meta
          name="description"
          content="Upcoming events held by Code4Community."
        />
      </Helmet>
      <Hero
        title="Demo Day 2021"
        subtitle="Join us in celebrating what C4C has accomplished over the last year."
        SvgNode={SVG}
      />

      <Grid container>
        <Grid item md={6}>
          <Box pb={3}>
            <Typography variant="h6" gutterBottom>
              About this event
            </Typography>
            <Typography variant="body1" paragraph>
              Demo Day is Code4Community's annual live virtual event to show off
              the applications we've managed to build over the last year and
              give some insight into what we have planned for next year!
            </Typography>
            <Typography variant="body1">
              We're inviting partners, prospective members, Northeastern
              faculty, and the entire Northeastern community to come celebrate
              the hard work of our product teams and hear what we have in store
              for next year!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs>
          <Container maxWidth="xs">
            <Card>
              <CardContent className={classes.detailsContainer}>
                <Container className={classes.centerLine}>
                  <Typography variant="h6" gutterBottom>
                    RSVP Now
                  </Typography>
                </Container>
                <Box className={classes.detailLine}>
                  <img
                    className={classes.icon}
                    src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Icons/calendar.svg"
                    alt="Linkedin"
                  />
                  <Typography>Thursday, May 27th</Typography>
                </Box>
                <Box className={classes.detailLine}>
                  <img
                    className={classes.icon}
                    src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Icons/time-clock.svg"
                    alt="Linkedin"
                  />
                  <Typography>6:00 p.m. - 7:00 p.m. EST</Typography>
                </Box>
                <Box className={classes.detailLine}>
                  <img
                    className={classes.icon}
                    src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Icons/zoom.svg"
                    alt="Linkedin"
                  />
                  <Typography>Held virtually over zoom</Typography>
                </Box>
                <Container className={classes.centerLine} disableGutters>
                  <Typography className={classes.infoText} align="center">
                    RSVPs will receive a zoom link before the event.
                  </Typography>
                </Container>
              </CardContent>
              <CardActions>
                <Container className={classes.centerLine}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href={rsvpLink}
                    target="_blank"
                  >
                    <Typography variant="h6">Reserve My Spot</Typography>
                  </Button>
                </Container>
              </CardActions>
            </Card>
          </Container>
        </Grid>
      </Grid>

      <Container maxWidth="md">
        <Grid container justify="center" alignItems="flex-start" spacing={1}>
          {projects.map((value, index) => {
            return <ProjectCard {...value} key={index} />;
          })}
        </Grid>
      </Container>
    </Container>
  );
};

export default DemoDay;
