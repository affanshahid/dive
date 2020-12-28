import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../query-client';
import Routes from './Routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Routes />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
