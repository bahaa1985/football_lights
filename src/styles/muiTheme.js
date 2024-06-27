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
          color: 'red',
          padding: '2px',
          margin: '2px',
          textAlign: 'left',
          borderBottom: '1px solid black',
          borderTop: '1px solid black',
        },
      },
    },
  },
  });

export default theme;
