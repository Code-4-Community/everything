import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  illustration: {
    width: '100%',
    height: '100%',
    padding: '1em',
  },
  root: {
    paddingTop: '1em',
    paddingBottom: '2em',
  },
  verticallyCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  roleTitle: {
    fontWeight: 500,
  },
  svgWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

interface HeroProps {
  title: string;
  subtitle: string;
  SvgNode: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, SvgNode }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item sm={6} className={classes.verticallyCenter}>
        <Typography className={classes.roleTitle} variant="h3">
          {title}
        </Typography>
        <Typography variant="h5" color="textSecondary">
          {subtitle}
        </Typography>
      </Grid>
      <Grid item sm={6} className={classes.svgWrapper}>
        <SvgNode className={classes.illustration} />
      </Grid>
    </Grid>
  );
};

export default Hero;
