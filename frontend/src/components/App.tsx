import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import { RecoilRoot } from "recoil";
import Routes from "./Routes";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Routes />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
