import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c3f3a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1c3f39',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffb959',
      contrastText: '#1c3f3a',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    success: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#1c3f3a',
    },
    h5: {
      fontWeight: 700,
      color: '#1c3f3a',
    },
    h6: {
      fontWeight: 600,
      color: '#1c3f3a',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '12px 24px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#163330',
          },
        },
      },
    },
  },
});

export default theme;
