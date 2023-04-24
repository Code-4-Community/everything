import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
} from '@material-ui/core';
import { TextQuoteBlock } from '../../components/TextQuoteBlock';

import { Link } from 'react-router-dom';

import Typed from 'typed.js';

//need to declare module
// @ts-ignore
import Fade from 'react-reveal/Fade';

import { ReactComponent as ImpactfulSvg } from './impactful.svg';
// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = makeStyles({
  homeLogo: {
    width: '16rem',
    margin: '0.5em',
  },

  landing: {
    height: '70vh',
    marginBottom: '15vh',
  },

  body: {
    fontSize: '24x',
    lineHeight: '31px',
  },

  section: {
    marginTop: '10vh',
    marginBottom: '10vh',
  },
  partnerLogos: {
    maxWidth: '100%',
    margin: 0,
    transition: 'transform .2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  partnerLogoGrid: {
    margin: '1em',
    display: 'block',
    justifyContent: 'center',
    maxWidth: 250,
  },
  bigImage: {
    maxWidth: '100%',
    maxHeight: '50vh',
  },
  landingTitle: {
    fontWeight: 400,
  },
  landingSubtitle: {
    fontWeight: 200,
  },
  logoWrapper: {
    marginBottom: '1em',
  },
  endActions: {
    paddingTop: '4em',
    paddingBottom: '8em',
  },
  endAction: {
    textTransform: 'none',
  },
  partners: {
    paddingTop: '1em',
  },
  typical: {
    margin: 0,
    color: '#5B54DA',
    fontWeight: 600,
  },
  endSection: {
    paddingTop: '15vh',
    paddingBottom: '15vh',
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const taglines = [
    'non profits in Boston.',
    'children fighting cancer.',
    "the future of Boston's urban forest.",
    'young adults facing homelessness.',
    'accessible integrative therapy.',
    'researchers of social policy.',
    'people and causes we love.',
  ];

  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const typed = new Typed(el.current, {
      strings: taglines,
      typeSpeed: 40,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 0,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Code4Community</title>
        <meta
          name="description"
          content="Designing software solutions for non-profit organizations in Boston. Northeastern University’s only student led collective for charitable software development."
        />
      </Helmet>

      <Grid container alignItems="center" className={classes.landing}>
        <div>
          <Typography
            variant="h3"
            align="left"
            className={classes.landingTitle}
            gutterBottom
          >
            Designing software solutions for
            <p className={classes.typical}>
              <span ref={el}></span>
            </p>
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            className={classes.landingSubtitle}
          >
            Learn more about Code4Community's mission below.
          </Typography>
        </div>
      </Grid>
      <Divider />

      <Fade>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.section}
          spacing={3}
        >
          <Grid item sm={7}>
            <Typography variant="h4" gutterBottom>
              Impactful, deliberate and inclusive software at no cost.
            </Typography>
            <Typography variant="body1">
              C4C strives to deliver work engineered with excellence and led by
              inclusive design principles to ensure our solutions are intuitive,
              performant, and deliver the best user experience.
            </Typography>
          </Grid>
          <Grid item sm={5}>
            <ImpactfulSvg className={classes.bigImage} />
          </Grid>
        </Grid>
      </Fade>
      <Divider />
      <Fade>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.section}
          spacing={3}
        >
          <Grid item md={5}>
            <LazyLoadImage
              className={classes.bigImage}
              src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/NortheasternNotchedNLatin.png"
              alt="Content Block"
            />
          </Grid>
          <Grid item md={7}>
            <Typography variant="h4" gutterBottom>
              Northeastern University’s only student led collective for
              charitable software development.
            </Typography>
            <Typography variant="body1">
              C4C is led by Northeastern students who are passionate about
              developing meaningful and exciting products. Students have the
              opportunity to learn the fundamentals of product and software
              development, while also contributing to the Boston community.
            </Typography>
          </Grid>
        </Grid>
      </Fade>

      <Divider />
      <Fade>
        <div className={classes.section}>
          <Typography variant="h3" align="center">
            Our Partners
          </Typography>

          <Grid
            container
            justify="space-around"
            alignItems="center"
            spacing={3}
            className={classes.partners}
          >
            <Grid item>
              <a
                href="https://lucyslovebus.org/"
                className={classes.partnerLogoGrid}
              >
                <LazyLoadImage
                  src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/LLB_2019_rgb.png"
                  alt="Lucy's Love Bus Logo"
                  className={classes.partnerLogos}
                />
              </a>
            </Grid>
            <Grid item>
              <a
                href="https://bostontrees.org/"
                className={classes.partnerLogoGrid}
              >
                <LazyLoadImage
                  src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/speakforthetrees_logo_original_RGB.jpg"
                  alt="Speak for the Trees"
                  className={classes.partnerLogos}
                />
              </a>
            </Grid>
            <Grid item>
              <a
                href="https://www.handsacrossthesea.net"
                className={classes.partnerLogoGrid}
              >
                <LazyLoadImage
                  src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/HandsLogo.jpg"
                  alt="Hands Across the Sea"
                  className={classes.partnerLogos}
                />
              </a>
            </Grid>
            <Grid item>
              <a
                href="https://www.povertyactionlab.org/"
                className={classes.partnerLogoGrid}
              >
                <LazyLoadImage
                  src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/JPAL_logo.svg"
                  alt="Jameel Abdul Latif Poverty Action Lab"
                  className={classes.partnerLogos}
                />
              </a>
            </Grid>
            <Grid item>
              <a
                href="https://lbfeboston.org/"
                className={classes.partnerLogoGrid}
              >
                <LazyLoadImage
                  src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/LBFE_logo.png"
                  alt="Little Brothers - Friends of the Elderly"
                  className={classes.partnerLogos}
                />
              </a>
            </Grid>
          </Grid>
        </div>
      </Fade>
      <Divider />

      <Grid container className={classes.section}>
        <Fade>
          <TextQuoteBlock
            quote="If the members of C4C are any indication of our future movers and shakers, we are in good hands. We were given frequent updates and they paid attention to every single detail, ensuring that the user experience was seamless and easy to follow. 2020 has been challenging on many fronts and our organization has been truly touched that the team remains so attentive and driven to complete the project in the midst of a global pandemic."
            name="Jackie Walker"
            title="Director of Programs at Lucy's Love Bus"
          />
        </Fade>
        <Fade>
          <TextQuoteBlock
            quote="Code4Community is a stellar example of a student organization that changes the world. At Code4Community you will apply and improve your skills, while helping non-profits increase efficiency and modernize. The work you do will touch and benefit the lives of those who need it most for years to come. Code4Community has showed me the power of software and has inspired me to use my skills to help make the world a better place."
            name="Stephen Alt"
            title="Founder of Code4Community"
          />
        </Fade>
        <Fade>
          <TextQuoteBlock
            quote="At Code4Community, I've met so many Northeastern students with diverse experiences, work ethics, talents, and the passion to help our local community. We work alongside one another to improve our leadership, teamwork, and technical skills. This is the community that I love to see grow and be a part of!"
            name="Sadaf Khansalar"
            title="Administrative Director"
          />
        </Fade>
        <Fade>
          <TextQuoteBlock
            quote="I’ve learned to build, lead, and collaborate with teams of developers and designers, all of which has prepared me very much for working in the industry. To be able to learn so much, and see the impact we have on our partner organizations, makes me very grateful to be a part of this organization."
            name="Jack Blanc"
            title="Former Director of Engineering"
          />
        </Fade>

        <Fade>
          <TextQuoteBlock
            quote="C4C is a club of passionate students that empower each other while building products that make a difference in our community. Members at any stage in their academic journey have opportunities to grow and learn within a community of students committed to empowering themselves and the people around them."
            name="Liam Moynihan"
            title="Former President of Code4Community"
          />
        </Fade>
      </Grid>
      <Fade>
        <div className={classes.endSection}>
          <Typography variant="h3" align="center">
            Want to work together?
          </Typography>
          <Typography variant="h3" align="center" className={classes.typical}>
            Let's Talk.
          </Typography>

          <Grid
            container
            justify="space-around"
            alignItems="center"
            className={classes.endActions}
          >
            <Button size="large" variant="text" component={Link} to={'/apply'}>
              <Typography variant="h4" className={classes.endAction}>
                Join our awesome team
              </Typography>
            </Button>
          </Grid>
        </div>
      </Fade>
    </Container>
  );
};

export default Home;
