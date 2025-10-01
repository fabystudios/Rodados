import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2", // Azul
      },
      secondary: {
        main: "#ff9800", // Naranja
      },
      background: {
        default: mode === "light" ? "#f4f6f8" : "#121212",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  });
