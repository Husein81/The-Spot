import { createTheme, ThemeOptions } from "@mui/material/styles";
import { useMemo } from "react";

// Define the color palette type
export type ColorPalette = {
  [key: number]: string;
};

// Define the color set type with primary and secondary colors
export type ColorSet = {
  primary: ColorPalette;
  secondary: ColorPalette;
};

// Function to define and return the color tokens
export const token = (): ColorSet => ({
  primary: {
    100: "#d5d5d5",
    200: "#ababab",
    300: "#828282",
    400: "#585858",
    500: "#2e2e2e",
    600: "#252525",
    700: "#1c1c1c",
    800: "#121212",
    900: "#090909",
  },
  secondary: {
    100: "#fcfcfc",
    200: "#f9f9f9",
    300: "#f7f7f7",
    400: "#f4f4f4",
    500: "#f1f1f1",
    600: "#c1c1c1",
    700: "#919191",
    800: "#606060",
    900: "#303030",
  },
});

// Function to define theme settings using the color tokens
export const themeSettings = (): ThemeOptions => {
  const colors = token();
  return {
    palette: {
      primary: {
        main: colors.primary[500],
        light: colors.primary[300],
        dark: colors.primary[700],
        contrastText: "#fff", // Add contrast text color if needed
      },
      secondary: {
        main: colors.secondary[500],
        light: colors.secondary[300],
        dark: colors.secondary[700],
        contrastText: "#000", // Add contrast text color if needed
      },
      background: {
        default: colors.primary[100], // Better suited for background colors
        paper: colors.primary[50] || "#ffffff", // Paper background color
      },
      text: {
        primary: colors.primary[500],
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  };
};

// Hook to use the theme with memoization
export const useMode = () => {
  // Create the theme using the settings and memoize it to avoid unnecessary recalculations
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return theme;
};
