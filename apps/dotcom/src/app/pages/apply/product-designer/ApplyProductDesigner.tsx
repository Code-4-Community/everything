import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, Grid } from '@material-ui/core';
import Hero from '../../../components/Hero';
import { ReactComponent as SVG } from './productdesigner.svg';
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
    maxWidth: '15em',
  },
});

const ApplyProductDesigner: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Product Designer</title>
        <meta
          name="description"
          content="Apply to be a Web Developer at Code4Community."
        />
      </Helmet>

      <Hero
        title="Product Designer"
        subtitle="Design accessible software for a cause. Shape user experiences."
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
                Product Designers are the main stakeholders for the design/UI of
                our projects. As a designer, you'll get to work with our
                software developers to create intuitive, user friendly products
                that meet the needs of our non profit partners and their
                members. You'll have the creative freedom to own, iterate, and
                improve the product using the feedback from our product teams
                and partners to achieve a high quality user experience. While
                your journey will start with mock-ups, you will be continuously
                reiterating at different fidelity levels to ensure the designs
                translate to working codable products.
              </Typography>
            </Box>
          </Fade>
          <Fade>
            <Box mb={5}>
              <Typography variant="h5" gutterBottom>
                What we’re looking for
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.text}>
                A great designer is someone who places the user at the forefront
                of the ideation and creation process. We want candidates
                interested in problem solving and are skilled at communicating
                ideas. Although having web design experience is a bonus, we
                value candidates that showcase a learning spirit, dedication to
                the iterative process, and a receptive nature to understand
                product needs and developer capabilities.
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
                    Motivated to learn new technologies and grow as a designer
                  </li>
                  <li>Passionate about helping the Boston community</li>
                  <li>
                    A strong communicator who facilitates collaboration amongst
                    the product team
                  </li>
                  <li>
                    Interested in being a part of the entire product life cycle:
                    software inception to completion
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
              onClick="https://forms.gle/8moSAiM8rchoz2BL6"
            />
          </Fade>
        </Grid>
        <Fade>
          <TextQuoteBlock
            quote="C4C is a purposeful club that maintains a unique dynamic from idea to launch. Having the opportunity to work in the design team not only gave me a taste of working in a start-up environment, but also a sense of accomplishment that encourages excitement for projects to come."
            name="Jennifer Adisoetjahya"
            title="UI/UX and Branding Lead"
          />
        </Fade>
      </Grid>
    </Container>
  );
};

export default ApplyProductDesigner;
