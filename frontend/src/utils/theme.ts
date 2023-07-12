import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B8EDE",
    },
    
  },

  components: {
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
            right: "0",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
            fontWeight: "500",
            textTransform: "uppercase",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
            paddingLeft: "10px",
            paddingRight: "120px",
            fontWeight: "500",
            fontSize: "1rem"
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
            boxShadow: "none",
            textTransform: "capitalize",
            fontWeight: "500",
            paddingLeft: "15px",
            paddingRight: "18px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#FAFAFA",
          border: "#D8D8D8 1.5px solid",
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingTop: "16px",
          paddingBottom: "20px",
          borderRadius: "10px",
          height: "-webkit-fill-available",
          position: "relative"
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
            transform: "rotate(180deg)",
        },
        switchBase: {
          color: "#B9B9B9",
        },
        colorPrimary: {
          "&.Mui-checked": {
            color: "#46C2B3",
          },
        },
        thumb: {
          boxShadow: "none",
        },
        track: {
          backgroundColor: "#D8D8D8",
          height:"11px",
          opacity: 1,
          border: "1.5px solid #bcb9b9",
          ".Mui-checked.Mui-checked + &": {
            backgroundColor: "#a4e1da",
            border: "#a4e1da solid 1px",
            opacity: 1,
          },
        },
      },
    },
  },
});

export default theme;
