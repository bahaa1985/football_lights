import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // اللون الأساسي
    },
    secondary: {
      main: '#dc004e', // اللون الثانوي
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          padding: 'auto',
          margin: '2px',
          textAlign: 'left',
          fontSize:'1rem'
          // ,lineHeight:'4.5'
        },
      },
    },
  },
  });

export default theme;
