import * as React from 'react';
import { Box, Grid, Typography, Divider } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: '2em',
  },
  quote: {
    fontWeight: 300,
  },
  name: {},
  title: {},
  divider: {},
});

interface QuoteBlockProps {
  readonly quote: string;
  readonly name: string;
  readonly title: string;
}

export const TextQuoteBlock: React.FC<QuoteBlockProps> = ({
  quote,
  name,
  title,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Typography variant="h6" align="left" className={classes.quote}>
        &ldquo;{quote}&rdquo;
      </Typography>

      <Box width={200} py={2}>
        <Divider className={classes.divider} />
      </Box>
      <Typography variant="body1" align="center" className={classes.name}>
        {name}
      </Typography>
      <Typography variant="body2" align="center" className={classes.title}>
        {title}
      </Typography>
    </Grid>
  );
};
