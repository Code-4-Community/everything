import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#5B54DA',
        // dark: will be calculated from palette.primary.main,
      },
      secondary: {
        // light: will be calculated from palette.primary.main,
        main: '#536DFE',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      text: {
        secondary: '#555',
      },
    },
    typography: {
      fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),

      //
      h2: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 600,
      },
    },
  })
);
