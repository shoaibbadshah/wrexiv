"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LicenseInfo } from "@mui/x-data-grid-pro";

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_PRO_LICENSE_KEY || "");

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {},
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          inputMultiline: {
            boxShadow: "none !important",
          },
          root: {
            "input:focus": {
              outline: "none",
              boxShadow: "none",
              borderColor: "initial",
            },
            'input[type="text"]:focus, input[type="email"]:focus, input[type="url"]:focus, input[type="password"]:focus, input[type="number"]:focus, input[type="date"]:focus, input[type="datetime-local"]:focus, input[type="month"]:focus, input[type="search"]:focus, input[type="tel"]:focus, input[type="time"]:focus, input[type="week"]:focus, textarea:focus':
              {
                outline: "none",
                boxShadow: "none",
                borderColor: "initial",
              },
          },
        },
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
