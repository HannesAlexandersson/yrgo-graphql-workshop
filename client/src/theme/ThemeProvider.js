import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

let lightTheme = createTheme({
  typography: {
    fontFamily: ["'Lato', sans-serif"],
    h1: {
      fontFamily: ["'Arvo', serif"],
    },
  },
  palette: {
    background: { default: "#e9e9e9" },
  },
});

lightTheme = responsiveFontSizes(lightTheme);

let darkTheme = createTheme({
  typography: {
    fontFamily: ["'Lato', sans-serif"],
    h1: {
      fontFamily: ["'Arvo', serif"],
    },
  },
  palette: {
    mode: "dark",
    background: { default: "#35363A" },
  },
});

darkTheme = responsiveFontSizes(darkTheme);

export const ThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
