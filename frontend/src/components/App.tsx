import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import Routes from "./Routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
