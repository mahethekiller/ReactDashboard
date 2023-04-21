import { useState } from "react";

import Login from "./scenes/login/";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import MainRoute from "./routes/MainRoute";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PublicRoutes />
        <MainRoute />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
