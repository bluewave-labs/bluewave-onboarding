import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7f56d9",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: "#344054",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "250px",
          flexShrink: 0,
          zIndex: 1200,
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default theme;
