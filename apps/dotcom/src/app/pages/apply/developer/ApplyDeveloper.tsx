import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { Alert } from '@material-ui/lab';
import React from 'react';
import { Helmet } from 'react-helmet';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import Hero from '../../../components/Hero';
import { TextQuoteBlock } from '../../../components/TextQuoteBlock';
import CTA from '../CTA';
import { ReactComponent as SVG } from './developer.svg';

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

const ApplyDeveloper: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Software Developer</title>
        <meta
          name="description"
          content="Apply to be a Software Developer at Code4Community."
        />
      </Helmet>
      <Hero
        title="Software Developer"
        subtitle="Develop long-term solutions. Write code to make an impact. "
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
                Software Developers at C4C are responsible for creating and
                maintaining software products for our partner organizations.
                Developers work in Agile collaborative teams and are exposed to
                every aspect of the product development cycle. Developers can
                expect to spend roughly 5 hours a week working on tickets with
                their team, with work ranging from Java API development to React
                UI development and cloud deployment.
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.text}>
                As a member of our product teams, you will be working closely
                with other developers under the guidance of a tech lead and
                product manager. You will actively participate in team meetings,
                meet our partners, and constantly learn new technologies.
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.text}>
                Code4Community is a unique opportunity to deliver real impact
                through the power of software. In your first few weeks, your
                code will be running in essential software systems to help
                children with life threatening illnesses, environmental
                conservators, educators in the Eastern Carribean, disadvantaged
                youth, and the elderly.
              </Typography>
            </Box>
          </Fade>
          <Fade>
            <Box mb={5}>
              <Typography variant="h5" gutterBottom>
                What we’re looking for
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.text}>
                A great developer is someone who is highly motivated and willing
                to learn. Although exposure to software development practices
                through co-ops, internships, or personal projects is a big plus,
                we ultimately highly value your passion to improve as a software
                developer. The ideal candidate is passionate about developing,
                and learns from their team while empowering the developers
                around them.
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.text}>
                Our application process for Fall 2023 is pending. Stay tuned for
                an update this Summer.
              </Typography>
              <Typography variant="body1" gutterBottom className={classes.text}>
                <i>
                  Due to limitations imposed by Khoury college, we can only
                  accept applications from undergraduate students.
                </i>
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
                    Dedicated to the mission, and can be trusted with real work
                    for real people
                  </li>
                  <li>
                    Motivated to learn new technologies and grow as a software
                    engineer
                  </li>
                  <li>Passionate about helping the Boston community</li>
                  <li>A strong communicator who facilitates collaboration</li>
                  <li>
                    Interested in being a part of the entire product life cycle
                    from software inception to completion
                  </li>
                </ul>
              </Typography>
            </Box>
          </Fade>
          {/* Ignore until next application season
              <Fade>
              <Box mb={5}>
              <Typography variant="h5" gutterBottom>
              Application Timeline
              </Typography>
              <Typography variant="body1" className={classes.text}>
              <ul className={classes.list}>
              <li>
              July 15th: Applications open
              </li>
              <li>July 30th: Applications close at midnight</li>
              <li>August: Applications are reviewed, candidates may be invited to interview</li>
              <li>
              September: Respond with decisions
              </li>
              </ul>
              </Typography>
              </Box>
              </Fade> */}
        </Grid>

        <Grid item sm={5} className={classes.application}>
          <Fade>
            <CTA
              disabled={false}
              onClick="https://forms.gle/LHNGNaU91omyChKH7"
            />
          </Fade>
        </Grid>

        <Fade>
          <TextQuoteBlock
            quote="Joining C4C pushed me out of my comfort zone almost immediately, but it’s also taught me more than many CS courses I’ve taken – everyone truly embraces a “learn by doing” attitude, and there are so many smart and kind people to help you out when you get stuck!"
            name="Jackie Lincroft"
            title="Software Developer"
          />
          <TextQuoteBlock
            quote="Code4Community gives you an unrivaled opportunity to learn software development while making a positive impact on the world. Too often at this school software is simply 'academic' or 'just business'. Unlike any other organization at Northeastern, Code4Community makes coding feel truly creative and compassionate."
            name="Ryan Jung"
            title="Software Developer"
          />
          <TextQuoteBlock
            quote="C4C gave me a glimpse of how software development really works in industry. I am grateful for the mentorship I’ve received, and I feel well-prepared for my next co-op. Also, it feels good seeing your code directly benefit the community."
            name="Brandon Liang"
            title="Software Developer"
          />
          <TextQuoteBlock
            quote="What I love most about C4C is its emphasis on the community. Whether its helping out the greater Boston area or teaching Northeastern students coding or connecting with other club members, C4C always makes community its number one priority. You will never feel alone in C4C."
            name="Max Sebso"
            title="Software Developer"
          />
          <TextQuoteBlock
            quote="I joined C4C without much knowledge related to software development, which left me feeling anxious about not having the proper skills to be a developer. However, thanks to an amazing team and their mentorship, I was able to learn and grow to become confident in my software development skills both in and out of C4C."
            name="Kimin Lee"
            title="Software Developer"
          />
        </Fade>
      </Grid>
    </Container>
  );
};

export default ApplyDeveloper;
