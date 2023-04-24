import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, Divider, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ReactComponent as C4CSvg } from '../svg/C4C.svg';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    marginTop: '6em',
  },
  logo: {
    height: '2.75em',
    padding: '1em',
    margin: 'auto',
  },
  footerLink: {
    color: 'inherit',
  },
  location: {
    fontWeight: 300,
  },
});

const Footer: React.FC = () => {
  const classes = useStyles();

  const [onHomePage, setOnHomePage] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const currentPath = location.pathname;
    setOnHomePage(currentPath === '/');
  }, [location]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Divider />
      <Box minHeight="10em" paddingY={5}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography gutterBottom color="textSecondary" variant="subtitle2">
              {onHomePage ? (
                <span className={classes.footerLink}>Home</span>
              ) : (
                <Link to="/" className={classes.footerLink}>
                  Home
                </Link>
              )}
              {' | '}
              <Link to="/apply" className={classes.footerLink}>
                Apply
              </Link>
              {' | '}
              <Link to="/events" className={classes.footerLink}>
                Events
              </Link>
              {' | '}
              <Link to="/people" className={classes.footerLink}>
                People
              </Link>
              {' | '}
              <Link to="/faq" className={classes.footerLink}>
                FAQs
              </Link>
            </Typography>
            <Typography
              gutterBottom
              color="textSecondary"
              align="left"
              variant="subtitle2"
            >
              Contact us at{' '}
              <a href="mailto:c4cneu@gmail.com" className={classes.footerLink}>
                c4cneu@gmail.com
              </a>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              gutterBottom
              color="textSecondary"
              align="right"
              variant="subtitle2"
            >
              <a
                href="https://github.com/Code-4-Community"
                className={classes.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              {' | '}
              <a
                href="https://c4cneu.slack.com"
                className={classes.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Slack
              </a>
              {' | '}
              <a
                href="https://www.facebook.com/c4cneu/"
                className={classes.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              {' | '}
              <a
                href="http://instagram.com/c4cneu"
                className={classes.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              {' | '}
              <a
                href="https://www.linkedin.com/company/code-4-community/"
                className={classes.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              {' | '}
              <a
                href="https://youtube.com/channel/UC7FI2u_BVjB0EkKMmx-yibA"
                className={classes.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Youtube
              </a>
            </Typography>
            <Typography
              gutterBottom
              color="textSecondary"
              align="right"
              variant="subtitle2"
            >
              Join our{' '}
              <a
                href="https://c4cneu.us4.list-manage.com/subscribe?u=4b534cd2e8fe8be8150d03977&id=b1915b8b8b"
                className={classes.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                mailing list
              </a>
            </Typography>
          </Grid>
          <Grid item xs>
            <Box display="flex" flexDirection="column" alignItems="center">
              <C4CSvg className={classes.logo} />
              <Typography
                color="textSecondary"
                align="center"
                variant="subtitle2"
              >
                Made with love by Code4Community
              </Typography>
              <Typography
                color="textSecondary"
                align="center"
                variant="subtitle2"
                className={classes.location}
              >
                Northeastern University, Boston MA
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Footer;
