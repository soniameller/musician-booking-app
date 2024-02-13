import { createTheme } from '@mui/material/styles';

const COLORS = {
  BRAND: {
    25: '#FDF7F4',
    100: '#F7DCD3',
    300: '#EDA892',
    700: '#DE6139',
    900: '#AB4B2C',
  },
  GREY: {
    100: '#F3F4F6',
    400: '#9CA3AF',
    500: '#6B7280',
    700: '#374151',
    900: '#111827',
  },
  DARK: {
    300: '#808080',
    700: '#374151',
  },
};

const primaryColor = COLORS.BRAND[700];
const primaryLight = COLORS.BRAND[25];

const dropShadow = '0px 2px 4px rgba(0,0,0,0.1)';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    subtitle1: {
      fontWeight: 700,
      fontSize: '0.875rem',
    },
    subtitle2: {
      color: primaryColor,
      fontWeight: 500,
    },
    body2: {
      color: COLORS.GREY[900],
      fontWeight: 500,
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: primaryColor,
      light: primaryLight,
    },
    grey: {
      100: COLORS.GREY[100],
      400: COLORS.GREY[400],
      500: COLORS.GREY[500],
      700: COLORS.GREY[700],
      900: COLORS.GREY[900],
    },
    action: {
      hover: primaryLight,
    },
    text: {
      primary: COLORS.DARK[700],
      secondary: COLORS.DARK[300],
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: COLORS.BRAND[700],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: dropShadow,
          '&:hover': {
            backgroundColor: primaryLight,
            border: '1px solid',
            borderColor: primaryColor,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        standard: {
          color: COLORS.DARK[700],
          fontWeight: 700,
          fontSize: '0.875rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            display: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          backgroundColor: COLORS.GREY[100],
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '&:after': {
            display: 'none',
          },
          '&:before': {
            display: 'none',
          },
          borderRadius: '4px', // Adjust as needed
          backgroundColor: COLORS.GREY[100],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: COLORS.GREY[100],
          fontSize: '0.875rem',
          fontColor: COLORS.GREY[500],
          '&.Mui-filled-primary': {
            backgroundColor: 'green', // Change the background color for selected state
            color: primaryColor,
          },
        },
        filledPrimary: {
          backgroundColor: COLORS.BRAND[100],
          color: COLORS.BRAND[900],
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: primaryColor,
          color: 'white',
          boxShadow: dropShadow,
          textDecoration: 'lowercase',
          textTransform: 'capitalize',
          padding: '12px',
        },
        outlined: {
          backgroundColor: 'white',
          borderColor: COLORS.GREY[400],
          color: COLORS.GREY[500],
          boxShadow: 'none',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          '& .MuiAlert-icon': {
            display: 'none',
          },
        },
        outlinedSuccess: {
          backgroundColor: primaryLight,
          border: `1.5px solid ${COLORS.BRAND[300]}`,
        },
        standardInfo: {
          backgroundColor: 'white',
          color: COLORS.GREY[400],
          textDecoration: 'italic',
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
