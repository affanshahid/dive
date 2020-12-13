import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Header from './Header';

export interface LayoutProps {
  children?: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
}

export default Layout;
