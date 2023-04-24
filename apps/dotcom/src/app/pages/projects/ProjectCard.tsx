import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  projectCard: {
    margin: '5%',
    height: 'max(fit-content, 500px)',
    overflow: 'visible',
  },
  projectImg: {
    height: '160px',
    objectFit: 'contain',
    transition: 'transform .2s',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  appDescription: {
    fontWeight: 300,
  },
});

interface CardProps {
  readonly title: string;
  readonly paragraph: string;
  readonly appDesc: string;
  readonly path: string;
  readonly abbr: string;
  readonly learnMore: string;
}

const ProjectCard: React.FC<CardProps> = ({
  title,
  paragraph,
  appDesc,
  path,
  abbr,
  learnMore,
}) => {
  const classes = useStyles();
  return (
    <Grid item md={6}>
      <Card className={classes.projectCard} elevation={0}>
        <Box height={'max(175, 100%)'}>
          <a href={learnMore}>
            <CardMedia
              component="img"
              className={classes.projectImg}
              image={path}
              alt={path}
              title={abbr}
            />
          </a>
        </Box>
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>

          <Typography
            variant="h6"
            className={classes.appDescription}
            gutterBottom
            color="textSecondary"
            component="p"
          >
            {appDesc}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {paragraph}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProjectCard;
