import { ThemeOptions, createTheme } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    secondary: {
      main: '#FFBF00',
      contrastText: '#000000',
      dark: '#ff6d00',
      light: '#f0ff64',
    },
    primary: {
      main: '#7b2cbf',
      dark: '#5A189A',
      light: '#9d4edd',
      contrastText: '#d5e4ea',
    },
    text: {
      primary: '#082946',
      disabled: '#BEAFD1',
      secondary: '#7A8691',
    },
    error: {
      main: '#FF2000',
      light: '#ec6a09',
    },
    success: {
      main: '#00C4B6',
      light: '#01cd90',
    },
    divider: 'rgba(119,119,119,0.67)',
    info: {
      main: '#3C91ED',
      light: '#1dc7f7',
      dark: '#2a60f5',
    },
  },
  typography: {
    caption: {
      fontFamily: 'Poppins',
      fontWeight: 100,
      letterSpacing: '0em',
    },
    h1: {
      fontSize: '3.6rem',
      fontFamily: 'Rubik',
    },
    h2: {
      fontFamily: 'Rubik',
      fontSize: '3rem',
    },
    body1: {
      fontFamily: 'Varela Round',
    },
    body2: {
      fontFamily: 'Varela Round',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Rubik',
      fontSize: '2.5rem',
    },
    h4: {
      fontFamily: 'Rubik',
    },
    h5: {
      fontFamily: 'Rubik',
    },
    h6: {
      fontFamily: 'Rubik',
    },
    button: {
      fontFamily: 'Poppins',
      fontWeight: 800,
    },
    subtitle1: {
      fontFamily: 'Poppins',
    },
    subtitle2: {
      fontFamily: 'Poppins',
    },
    overline: {
      fontFamily: 'Varela Round',
    },
    fontFamily: 'Poppins',
  },
};

const lightTheme = createTheme(themeOptions);
export default lightTheme;
