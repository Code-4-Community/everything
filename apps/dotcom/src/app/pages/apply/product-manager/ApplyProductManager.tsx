import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, Grid } from '@material-ui/core';
import Hero from '../../../components/Hero';
import { ReactComponent as SVG } from './productmanager.svg';
import { TextQuoteBlock } from '../../../components/TextQuoteBlock';
import CTA from '../CTA';
// @ts-ignore
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles({
  image: {
    width: '100%',
    borderRadius: 10,
    margin: 'auto',
  },
  list: {
    marginTop: 0,
    '& > li': {
      marginBottom: '0.25em',
    },
  },
  stepper: {
    paddingTop: '2.5em',
    paddingRight: '0',
    maxWidth: '16em',
  },
  application: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  text: {
    //fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  picture: {
    borderRadius: '10em',
    maxWidth: '10em',
  },
  pictureWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1em',
  },
  blockQuote: {
    borderLeft: '4px solid gray',
    paddingLeft: '0.5em',
    marginBottom: '1em',
  },
  leftQuote: {
    position: 'relative',
    fontSize: '8em',
  },
  applyButton: {
    textTransform: 'none',
    fontWeight: 500,
    maxWidth: '16em',
  },
});

const ApplyProductManager: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Product Manager</title>
        <meta
          name="description"
          content="Apply to be a Product Manager at Code4Community."
        />
      </Helmet>

      <Hero
        title="Product Manager"
        subtitle="Create impactful software from the ground up. Lead with confidence."
        SvgNode={SVG}
      />

      <Grid container spacing={3}>
        <Grid item sm={7}>
          <Fade>
            <Box mb={5}>
              <Typography variant="h5" gutterBottom>
                What you'll be doing
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.text}>
                Product Managers at C4C are responsible for scoping out the
                features of our projects, prioritizing developer work, and
                ensuring we're on track to deliver a high quality product at the
                end of the year. Product Managers lead team and client meetings,
                and with the help of our tech leads adjust and optimize the
                team's focus and process. They are the main drivers of our
                initial project specification and help turn that specification
                into actionable and Agile developer tickets.
              </Typography>
            </Box>
          </Fade>
          <Fade>
            <Box mb={5}>
              <Typography variant="h5" gutterBottom>
                What we’re looking for
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.text}>
                A great product manager is someone that is very organized and
                has the foresight to anticipate future challenges. They must be
                an excellent communicator and have the confidence to lead and
                manage a team. Experience writing software is a plus, but
                experience managing any kind of product from start to finish
                will be more applicable. The ideal candidate is passionate about
                bringing projects to life and is excited about empowering a team
                to make an impact in the Boston community.
              </Typography>
            </Box>
          </Fade>
          <Fade>
            <Box mb={5}>
              <Typography variant="h5" gutterBottom>
                Our ideal candidate is someone who is...
              </Typography>
              <Typography variant="body1" className={classes.text}>
                <ul className={classes.list}>
                  <li>
                    Able to understand our partners' needs and conceptualize
                    solutions
                  </li>
                  <li>Organized and forward thinking</li>
                  <li>
                    Experienced in working within an Agile development process
                  </li>
                  <li>
                    A strong communicator who facilitates collaboration amongst
                    the product team
                  </li>
                  <li>
                    Interested in being a part of the entire product life cycle
                    from project proposal to delivery
                  </li>
                  <li>
                    Dedicated to the C4C mission and has excellent follow
                    through
                  </li>
                </ul>
              </Typography>
            </Box>
          </Fade>
        </Grid>

        <Grid item sm={5} className={classes.application}>
          <Fade>
            <CTA
              disabled={false}
              onClick="https://forms.gle/7MHkM3iAYAfiHPYD9"
            />
          </Fade>
        </Grid>

        <Fade>
          <TextQuoteBlock
            quote="Joining C4C gave me a taste of what a project manager’s role is like in the real world and provided me with a valuable opportunity to hone important cross-functional skills! I’m so proud to be part of a such a supportive and community-oriented organization!"
            name="Sanjana Mishra"
            title="Product Manager"
          />
          <TextQuoteBlock
            quote="Code4Community gave me an amazing leadership opportunity and furthered my professional experience. I feel like I can talk about my impact on the community to peers and even in job interviews. Everyone here is extremely supportive and we're all here to help each other grow."
            name="Chloe Gold"
            title="Director of Product Management"
          />
          <TextQuoteBlock
            quote="Working as a product manager for Code4Community has truly been a one of a kind learning experience. leading a team of full time students towards delivering software for a non-profit has been difficult, however thrilling and very rewarding."
            name="Jack Tonina"
            title="Director of Product Management"
          />
        </Fade>
      </Grid>
    </Container>
  );
};

export default ApplyProductManager;
