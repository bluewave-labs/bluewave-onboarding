import { createTheme } from "@mui/material/styles";

// Light theme definition
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7f56d9",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  components: {
    //MuiSvgIcon
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "var(--main-text-color)",
        },
      },
    },
    // MuiIconButton Styles - ADDED HERE
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "var(--main-text-color)", // Sets the color for IconButton
        },
      },
    },
    // MuiTextField Styles - ADDED HERE
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-colorError": {
            color: "var(--border-error-solid)",
          },
          "& svg": {
            color: "var(--light-border-color)",
          },
          "& .MuiDivider-root": {
            margin: "0 10px",
          },
          "& .MuiOutlinedInput-root": {
            fontSize: "13px",
            boxShadow: "0px 1px 2px 0px #1018280d",
            "&:hover fieldset": {
              borderColor: "var(--main-purple)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--main-purple)",
            },
          },
          "& .MuiButton-root": {
            fontSize: "13px",
            color: "var(--second-text-color)",
          },
        },
      },
    },
    // MuiInputLabel Styles (for labels inside textField) - ADDED HERE
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          color: "var(--second-text-color)",
        },
      },
    },
    // MuiListItem Styles (dropdown menu items)
    MuiListItem: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#F9FAFB",
          },
        },
      },
    },
    // MuiTypography Styles (dropdown text)
    MuiTypography: {
      styleOverrides: {
        root: {
          width: "100%",
          fontSize: "13px",
          fontWeight: 400,
          lineHeight: "24px",
          color: "var(--main-text-color)",
          display: "inline",
          justifyContent: "center",
          "&.title": {
            fontSize: "11px",
            fontWeight: 400,
            lineHeight: "38px",
            color: "#98A2B3",
            marginLeft: "8px",
            marginTop: "8px",
          },
        },
      },
    },
    // MuiList Styles (dropdown list padding)
    MuiList: {
      styleOverrides: {
        padding: {
          paddingTop: "4px !important",
          paddingBottom: "4px !important",
        },
      },
    },
    // MuiSvgIcon Styles (icon color)
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "var(--second-text-color)",
        },
      },
    },
    // MuiListItemIcon Styles (icon spacing)
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "2rem",
        },
      },
    },
    // MuiMenuItem Styles
    MuiMenuItem: {
      styleOverrides: {
        root: {
          margin: "0px 5px !important",
          fontSize: "13px !important",
          "&.Mui-selected": {
            backgroundColor: "#F9FAFB !important",
            borderRadius: "8px !important",
          },
        },
      },
    },
    // MuiSelect Styles (Dropdown)
    MuiSelect: {
      styleOverrides: {
        root: {
          width: "241px",
          height: "34px",
          fontSize: "13px !important",
          borderRadius: "8px !important",
        },
      },
    },
    // MuiPickersDay (for date picker day styling)
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "var(--main-purple) !important",
            color: "white !important",
          },
          "&.MuiDateRangePickerDay-day.Mui-selected": {
            backgroundColor: "#7f56d9 !important",
            color: "white !important",
          },
          "&.MuiDateRangePickerDay-day.Mui-selected:first-child": {
            backgroundColor: "#7f56d9 !important",
          },
          "&.MuiDateRangePickerDay-day.Mui-selected:last-child": {
            backgroundColor: "#7f56d9 !important",
          },
          "&.MuiPickersDay-rangeIntervalDay:not(.Mui-selected):not(:first-child):not(:last-child)":
            {
              backgroundColor: "#f9fafb !important",
              color: "#000 !important",
            },
        },
      },
    },
    // MuiButtonBase (for individual buttons like apply, cancel)
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.apply": {
            backgroundColor: "#7f56d9 !important",
            color: "white !important",
            width: "142px",
            height: "34px",
            gap: "var(--spacing-xs, 4px)",
            border:
              "1px solid var(--Component-colors-Components-Buttons-Primary-button-primary-border, #7F56D9) !important",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          },
          "&.cancel": {
            backgroundColor: "#fff !important",
            color: "#344054 !important",
            width: "142px",
            height: "34px",
            gap: "var(--spacing-xs, 4px)",
            border:
              "1px solid var(--Component-colors-Components-Buttons-Secondary-button-secondary-border, #D0D5DD) !important",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          },
        },
      },
    },
    // Mui checkbox styles
    MuiCheckbox: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          border: "none",
          outline: "none",
        },
      },
      // Primary checkbox styles
      colorPrimary: {
        color: "var(--main-purple)",
        "&.Mui-checked": {
          color: "var(--main-purple)",
        },
        "&.MuiCheckbox-indeterminate": {
          color: "var(--main-purple)",
        },
      },
      // Secondary checkbox styles
      colorSecondary: {
        color: "#808080E5",
        "&.Mui-checked": {
          color: "#808080E5",
        },
        "&.MuiCheckbox-indeterminate": {
          color: "#808080E5",
        },
      },
    },
    // AppBar customizations
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: "#344054",
        },
      },
    },
    // Drawer customizations
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "250px",
          flexShrink: 0,
          zIndex: 1200,
        },
      },
    },
    // Tab and Tabs customizations
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "20px",
          "&.Mui-selected": {
            color: "var(--main-purple)",
          },
          "&:not(.Mui-selected)": {
            color: "var(--main-text-color)",
            borderBottom:
              "1px solid var(--Colors-Foreground-fg-brand-primary_alt, #EAECF0)",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "var(--main-purple)",
        },
      },
    },
    // Button customizations
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px", // Common button styling
          textTransform: "none",
          boxShadow: "none",
        },
        // Primary button styling
        containedPrimary: {
          color: "white",
          backgroundColor: "var(--main-purple)",
          transition: "background-color 0.3s, border-color 0.3s",
          "&:hover": {
            backgroundColor: "#6f46c9",
          },
          "&:active": {
            outline: "4px solid #e4dcf6",
            boxShadow: "0px 0px 0px 4px #9E77ED3D, 0px 1px 2px 0px #1018280D",
          },
          "&:disabled": {
            color: "grey",
            backgroundColor: "#f3f4f7",
            borderColor: "#80808033",
            fontWeight: 600,
          },
        },
        // Error button styling
        containedError: {
          color: "white",
          backgroundColor: "var(--border-error-solid)",
          boxShadow: "none",
          transition: "background-color 0.3s, border-color 0.3s",
          "&:hover": {
            backgroundColor: "#b32217",
          },
          "&:active": {
            outline: "4px solid #FCCED7",
            boxShadow: "0px 0px 0px 4px #FCCED7, 0px 1px 2px 0px #1018280D",
          },
        },
        // Secondary disabled button styling
        outlinedSecondary: {
          "&:disabled": {
            color: "grey",
            backgroundColor: "white",
            borderColor: "#80808033",
            fontWeight: 600,
          },
        },
        // Secondary purple button styling
        outlinedPrimary: {
          color: "#7F3CD9B2",
          borderColor: "var(--main-purple)",
          backgroundColor: "white",
          border: "1px solid var(--light-border-color)",
          "&:hover": {
            backgroundColor: "#7F3CD919",
            borderColor: "var(--main-purple)",
          },
          "&:active": {
            outline: "4px solid #D6BBFB",
            backgroundColor: "white",
            boxShadow: "0px 0px 0px 4px #9E77ED3D, 0px 1px 2px 0px #1018280D",
          },
        },
        // Secondary grey button styling
        outlinedNeutral: {
          color: "#808080E6",
          borderColor: "#80808033",
          backgroundColor: "white",
          border: "1px solid var(--light-border-color)",
          "&:hover": {
            backgroundColor: "#F9FAFB",
            boxShadow: "none",
          },
          "&:active": {
            outline: "4px solid #80808033",
            boxShadow: "0px 0px 0px 4px #98A2B324, 0px 1px 2px 0px #1018280D",
            backgroundColor: "white",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

// Dark theme definition
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7f56d9",
    },
    background: {
      default: "#121212",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#333",
          color: "#FFFFFF",
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
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "20px",
          "&.Mui-selected": {
            color: "var(--main-purple)",
          },
          "&:not(.Mui-selected)": {
            color: "var(--main-text-color)",
            borderBottom:
              "1px solid var(--Colors-Foreground-fg-brand-primary_alt, #EAECF0)",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "var(--main-purple)",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});
