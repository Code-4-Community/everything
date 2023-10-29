// Mostly copied from src/app/components/Accordion.tsx

import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Fade,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

interface AccordionProps {
  sections: any[];
}

const useStyles = makeStyles({
  title: {
    fontWeight: 500,
  },
});

const Accordion: React.FC<AccordionProps> = (props: any) => {
  const classes = useStyles();
  const [showHiddenQuestions, setShowHiddenQuestions] = useState(false);

  return (
    <>
      {props.sections.map((section: any, index: any) => (
        <Fade in timeout={1000 + 200 * index}>
          <MuiAccordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={() => {
                console.log('onClick called');
                setShowHiddenQuestions(true);
              }}
              id="panel1a-header"
            >
              <Typography
                variant="body1"
                className={classes.title}
                color="primary"
              >
                {section.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{section.body}</Typography>
            </AccordionDetails>
          </MuiAccordion>
        </Fade>
      ))}
      {showHiddenQuestions && (
        <React.Fragment>
          {props.hiddenQuestions.map((question: string) => (
            <>{question}</>
          ))}
        </React.Fragment>
      )}
    </>
  );
};

export default Accordion;
