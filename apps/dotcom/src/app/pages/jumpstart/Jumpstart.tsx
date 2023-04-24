import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Grid, Typography, Button } from '@material-ui/core';
import Hero from '../../components/Hero';
import { ReactComponent as JumpstartSvg } from './jumpstart.svg';
import JumpstartAccordion from '../../components/Accordion';
import JumpstartData from './JumpstartData';
// @ts-ignore
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles({
  section: {
    marginTop: '5vh',
    marginBottom: '10vh',
  },
  subtext: {
    marginTop: '1.5vh',
  },
  flexSection: {
    marginTop: '5vh',
    marginBottom: '10vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    textTransform: 'none',
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Jumpstart: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Jumpstart</title>
        <meta
          name="description"
          content="Code4Community's Jumpstart is a brand new full-stack development program for first time developers."
        />
      </Helmet>
      <Hero
        subtitle="Our brand new full-stack development program for first time developers."
        title="Jumpstart"
        SvgNode={JumpstartSvg}
      />

      <Grid
        container
        justify="space-between"
        alignItems="flex-start"
        direction="row"
        className={classes.section}
        spacing={3}
      >
        <Grid item sm={6}>
          <Fade>
            <Typography variant="h5">What is Jumpstart?</Typography>
            <Typography variant="body1" className={classes.subtext}>
              Jumpstart is Code4Community's new program that focuses on teaching
              the basics of web development for beginners. We have planned a
              10-week course that runs through a lot of the fundamentals you'll
              want to know for developing a web application. Through the
              program's project, you will be learning technologies like React,
              Typescript, Vertx, and Java. A basic understanding of programming
              is required (Java recommended), and you'll learn everything else
              you need from our weekly workshops! Jumpstart sessions will all be
              online and recorded, see our FAQ for details.
            </Typography>
          </Fade>
        </Grid>
        <Grid item sm={6}>
          <Fade>
            <Typography variant="h5">What will I learn?</Typography>
            <Typography variant="body1" className={classes.subtext}>
              Throughout the Jumpstart course, we'll be helping you build a
              functioning web application with a React and Typescript frontend
              and a Vertx and Java backend. We'll be going through Git, the
              terminal, HTML, CSS, Javascript, REST requests and APIs,
              databases, cloud deployment, and testing. Don't worry if any of
              that doesn't make sense. By the end of this course we'll have you
              comfortable with each of these topics.
            </Typography>
          </Fade>
        </Grid>
        <Grid item sm={6}>
          <Fade>
            <Typography variant="h5">What's the project?</Typography>
            <Typography variant="body1" className={classes.subtext}>
              Throughout the duration of the program we'll be making a blog-like
              web application. In our app, people will be able to view posts,
              create posts, "clap!" (like), comment, and more. You aren't
              required to follow along with our blog app, you can create
              whatever application you want! However, we'll be providing help,
              examples, and weekly catch-up code for our blog application - we'd
              still love to help you out with your project though. There also
              won't be any extra requirements, and you can even extend your
              project as much as you'd like!
            </Typography>
          </Fade>
        </Grid>
        <Grid item sm={6}>
          <Fade>
            <Typography variant="h5">
              Can I still join if I miss a meeting?
            </Typography>
            <Typography variant="body1" className={classes.subtext}>
              Every week we'll be providing catch-up code to everyone before the
              start of the next meeting, to make sure everyone is caught up with
              where we are hoping they would be. The intention here is to help
              those who are stuck somewhere on their project, missed the last
              meeting, or were too busy during the week to make enough progress
              stay caught up with their project and prevent them from falling
              behind. Although this means that you aren't required to finish
              your weekly progress, we can 100% guarantee that you won't learn
              as much by skipping the work.
            </Typography>
          </Fade>
        </Grid>
      </Grid>

      <Fade>
        <Typography variant="h3" align="center">
          Want to join?
        </Typography>
      </Fade>
      <Fade>
        <Box className={classes.flexSection}>
          <Button
            variant="outlined"
            className={classes.button}
            component="a"
            href="https://forms.gle/5AgQCcU5YpWgmEzr9"
            color="primary"
          >
            <Typography variant="h5">Sign up here!</Typography>
          </Button>
        </Box>
      </Fade>
      <Fade>
        <Box paddingBottom={5}>
          <Container maxWidth="sm">
            <JumpstartAccordion sections={JumpstartData} />
          </Container>
        </Box>
      </Fade>
    </Container>
  );
};

export default Jumpstart;
