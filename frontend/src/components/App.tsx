import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Routes from './Routes';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Routes />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
