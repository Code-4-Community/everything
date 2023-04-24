import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { ReactComponent as SVG } from './people.svg';

import Member from './Member';
import { people } from './PeopleData';
import Hero from '../../components/Hero';

// @ts-ignore
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles({
  example: {
    color: 'red',
  },
  root: {
    alignContent: 'center',
    textAlign: 'center',
    paddingBottom: 50,
    background: '#fff',
  },
  title: {
    margin: 20,
  },
  hero: {
    marginBottom: 10,
  },
  positionTitle: {
    fontSize: '40px',
    margin: '30px 0px',
  },
});

const People: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="md" className={classes.hero}>
        <Helmet>
          <title>People</title>
          <meta name="People" content="Meet the people of Code4Community." />
        </Helmet>
        <Hero
          title="People"
          subtitle="Meet the people of Code4Community."
          SvgNode={SVG}
        />
      </Container>
      <Fade>
        <Container maxWidth="md">
          <div className={classes.root}>
            <Grid container justify="center" alignItems="center" spacing={3}>
              {people.map((person, i) => (
                <Member {...person} key={i} />
              ))}
            </Grid>
          </div>
        </Container>
      </Fade>
    </div>
  );
};

export default People;
