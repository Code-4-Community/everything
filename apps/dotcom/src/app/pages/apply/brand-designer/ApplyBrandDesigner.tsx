import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, Grid } from '@material-ui/core';
import Hero from '../../../components/Hero';
import { ReactComponent as SVG } from './branddesigner.svg';
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

const ApplyBrandDesigner: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Developer</title>
        <meta
          name="description"
          content="Apply to be a Web Developer at Code4Community."
        />
      </Helmet>

      <Hero
        title="Brand Designer"
        subtitle="Guide with innovative designs. Build a powerful brand."
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
                As a Brand Designer, you will support the growth of C4C's brand
                identity by refining our guidelines, voice, and design system.
                You will work closely with the E-Board to build rapport with our
                members and followers, research trending styles, and
                competitively position C4C as an organization through our shared
                content. The main collateral you will be working on is content
                that can be used on our social media accounts with eye-catching
                assets that innovatively express the C4C brand.
              </Typography>
            </Box>
          </Fade>
          <Fade>
            <Box mb={5}>
              <Typography variant="h5" gutterBottom>
                What we’re looking for
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.text}>
                Our ideal candidate is someone who enjoys experimenting with
                graphic design, typography, and imagery. They are forward
                thinking and enjoy evaluating how one design contributes to the
                larger scheme of a platform, series, or campaign. Although
                proficiency with Adobe Illustrator and Indesign are bonuses, we
                value candidates who showcase a learning spirit and are
                enthusiastic about fostering a collaborative community through
                branding efforts.
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
                    Comfortable with Adobe Creative Cloud, particularly
                    Illustrator and InDesign
                  </li>
                  <li>
                    Thoughtful and can approach a design from many different
                    perspectives
                  </li>
                  <li>
                    Motivated and loves taking ideas from conception to
                    completion
                  </li>
                  <li>
                    Interested in brand development and how to express ideas
                    through design
                  </li>
                </ul>
              </Typography>
            </Box>
          </Fade>
        </Grid>

        <Grid item sm={5} className={classes.application}>
          <Fade>
            <CTA onClick="https://forms.gle/v6HVUjQSPjVP4mkV9" />
          </Fade>
        </Grid>
        <Fade>
          <TextQuoteBlock
            quote="Applying fundamental design knowledge to a real functioning product has been one of the most rewarding learning experiences I've had the opportunity to partake in. It's a whole other world when there are actual stakeholders for your project, and a development team to iterate with."
            name="Reine Nisheiwat"
            title="Director of Design"
          />
        </Fade>
      </Grid>
    </Container>
  );
};

export default ApplyBrandDesigner;
