import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  person: {
    paddingTop: 15,
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: 14,

    "&:hover": {
      "& $icons": {
        opacity: 1,
        transition: "opacity .3s ease-in-out",
        MozTransition: "opacity .3s ease-in-out",
        WebkitTransition: "opacity .3s ease-in-out",
      },
    },
  },
  portrait: {
    position: "relative",
    margin: 0,
    paddingBottom: 0,
    maxWidth: "100%",
    width: "280px",
    height: "280px",
    objectFit: "cover",
    overflow: "hidden",
  },
  name: {
    fontWeight: 500,
    paddingBottom: 2,
  },
  position: {
    fontWeight: 400,
    fontSize: 12,
  },
  icon: {
    cursor: "pointer",
    transition: "all .15s ease-in-out",
    width: 30,
    height: 30,
    marginLeft: "0.5em",
    marginRight: "0.5em",
    "&:hover": {
      transform: "scale(1.15)",
    },
    borderRadius: 0,
    backgroundColor: "white",
  },

  icons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "0.5em",
  },
  cardText: {
    padding: 5,
    fontSize: 12,
  },
  gridItem: {
    minWidth: "280px",
  },
}));

interface MemberProps {
  readonly name: string;
  position: string;
  image: string;
  altImage?: string;
  linkedin: string;
  email: string;
}

const Member: React.FC<MemberProps> = ({
  name,
  position,
  image,
  altImage,
  linkedin,
  email,
}) => {
  const classes = useStyles();
  return (
    <Grid item sm={4} className={classes.gridItem}>
      <Paper className={classes.person} elevation={0}>
        <picture>
          {image && image.endsWith("webp") && (
            <source
              className={classes.portrait}
              srcSet={image}
              type="image/webp"
            />
          )}
          <img
            className={classes.portrait}
            src={altImage ?? image}
            alt={name}
            loading="lazy"
          />
        </picture>
        <div className={classes.cardText}>
          <Typography className={classes.name} variant="subtitle2">
            {name}
          </Typography>
          <Typography className={classes.position} variant="subtitle2">
            {position}
          </Typography>
        </div>
        <div className={classes.icons}>
          <a href={linkedin} rel="noopener noreferrer" target="_blank">
            <img
              className={classes.icon}
              src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/linkedin_logo.svg"
              alt="Linkedin"
            />
          </a>
          <a href={"mailto:" + email} rel="noopener noreferrer" target="_blank">
            <img
              className={classes.icon}
              src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/email.svg"
              alt="Email"
            />
          </a>
        </div>
      </Paper>
    </Grid>
  );
};

export default Member;
