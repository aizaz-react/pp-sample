import { createTheme } from '@mui/material';
import localFont from 'next/font/local';

export const ProximaNova = localFont({
  src: [
    { path: '../assets/fonts/Proxima.otf', weight: '300' },
    { path: '../assets/fonts/Proxima.otf', weight: '400' }
  ]
});

const defaultTheme = createTheme();

export const pxToRem = (value) => `${value / 16}rem`;

const typography = {
  heading1: {
    fontFamily: ProximaNova.style,
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: pxToRem(40),
    lineHeight: pxToRem(49),
    [defaultTheme.breakpoints.down('md')]: {
      fontWeight: 400,
      fontSize: pxToRem(30),
      lineHeight: pxToRem(44)
    }
  },
  heading2: {
    fontFamily: ProximaNova.style,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: pxToRem(36),
    lineHeight: pxToRem(44),
    [defaultTheme.breakpoints.down('lg')]: {
      fontSize: pxToRem(32)
    },
    [defaultTheme.breakpoints.down('md')]: {
      fontSize: pxToRem(24)
    }
  },
  heading3: {
    fontFamily: ProximaNova.style,
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: pxToRem(32),
    lineHeight: pxToRem(39)
  },
  subHeading1: {
    fontFamily: ProximaNova.style,
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: pxToRem(24),
    lineHeight: pxToRem(29)
  },
  subHeading2: {
    fontFamily: ProximaNova.style,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(24)
  },
  subHeading3: {
    fontFamily: ProximaNova.style,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: pxToRem(16),
    lineHeight: pxToRem(24)
  },
  body1: {
    fontFamily: ProximaNova.style.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: pxToRem(16),
    lineHeight: pxToRem(24),
    [defaultTheme.breakpoints.down('md')]: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(17)
    }
  },
  body2: {
    fontFamily: ProximaNova.style.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: pxToRem(14),
    lineHeight: 1.5
  },
  caption1: {
    fontFamily: ProximaNova.style.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: pxToRem(12),
    lineHeight: 1.5
  },
  caption2: {
    fontFamily: ProximaNova.style.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: pxToRem(10),
    lineHeight: pxToRem(12)
  }
};

export const theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    primary: {
      main: '#ff6d00', // dijon
      contrastText: '#041218'
    },
    primaryLight: {
      main: '#ff9e00',
      contrastText: '#041218'
    },
    secondary: {
      main: '#c77dff',
      contrastText: '#fff'
    },
    error: {
      main: '#D85118'
    },
    warn: {
      main: '#FABD2F'
    },

    secondaryLight: {
      main: '#e0aaff',
      contrastText: '#fff'
    },
    text: {
      primary: '#fff',
      secondary: '#BFBFBF',
      secondaryLight: '#D9D9D9',
      disabled: '#9B9B9B'
    },
    divider: '#BFBFBF',
    background: {
      default: '#10002b',
      paper: '#5a189a',
      card: '#5a189a',
      defaultLight: '#0412184D'
    },
    action: {
      active: '#fff',
      hover: 'rgba(0, 0, 0, 0.15)',
      hoverOpacity: 0.08,
      selected: 'rgba(0, 0, 0, 0.15)',
      disabled: '#FABD2F',
      disabledBackground: '#041218'
    },
    chip: {
      success: {
        color: '#388E3C',
        bgColor: '#388E3C1A'
      },
      fatal: {
        color: '#B71C1C',
        bgColor: '#B71C1C26'
      },
      error: {
        color: '#D85118',
        bgColor: '#D8511810'
      },
      warn: { color: '#FABD2F', bgColor: '#E39E3610' },
      deny: {
        color: '#E39E36',
        bgColor: '#E39E361A'
      },
      info: {
        color: '#429CBD',
        bgColor: '#275D7110'
      }
    }
  },
  typography,
  components: {
    MuiButton: {
      root: {
        fontFamily: ProximaNova.style.fontFamily
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            borderRadius: 50,
            padding: defaultTheme.spacing(1, 0),
            ...typography.subHeading2,
            fontFamily: ProximaNova.style.fontFamily,
            textTransform: 'none',
            boxShadow: 'none'
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderRadius: 50,
            padding: defaultTheme.spacing(1, 0),
            ...typography.subHeading2,
            fontFamily: ProximaNova.style.fontFamily,
            textTransform: 'none'
          }
        }
      ],
      styleOverrides: {
        root: {
          fontFamily: ProximaNova.style.fontFamily,
          '&.Mui-disabled': {
            background: '#D9D9D930',
            color: '#041218',
            border: 'none',
            '& label': {
              color: '#041218'
            }
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #041218 inset',
              WebkitTextFillColor: '#fff',
              caretColor: '#fff'
            }
          }
        }
      }
    }
  }
});
