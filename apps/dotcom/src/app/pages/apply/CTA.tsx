import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '14em',
  },
  applyButton: {
    textTransform: 'none',
    fontWeight: 500,
  },
  applyButtonBase: {
    width: '100%',
  },
  stepper: {
    paddingTop: '2.5em',
    paddingRight: '0',
    maxWidth: '15em',
  },
});

interface CTAProps {
  readonly onClick: string;
  readonly disabled?: boolean;
}

const CTA: React.FC<CTAProps> = ({ onClick, disabled }) => {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.root}>
      <Stepper
        className={classes.stepper}
        activeStep={-1}
        orientation="vertical"
      >
        <Step key={1} active>
          <StepLabel>
            Prepare your resume, and read through our website!
          </StepLabel>
        </Step>
        <Step key={2} active>
          <StepLabel>Send in your application</StepLabel>
        </Step>
        <Step key={3} active>
          <StepLabel>Wait for us to contact you!</StepLabel>
        </Step>

        <Box paddingLeft={'24px'} paddingTop={'1.5em'} marginBottom={'2em'}>
          <Button
            variant="contained"
            color="primary"
            href={onClick}
            target="_blank"
            className={classes.applyButtonBase}
            disabled={disabled}
          >
            <Typography variant="body1" className={classes.applyButton}>
              Apply Now
            </Typography>
          </Button>
        </Box>
      </Stepper>
    </Grid>
  );
};

export default CTA;
