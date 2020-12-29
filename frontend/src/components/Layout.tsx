import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { GlobalErrorBoundary } from './GlobalErrorBoundary';
import Header from './Header';

export interface LayoutProps {
  children?: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Header />
      <GlobalErrorBoundary>{children}</GlobalErrorBoundary>
    </Box>
  );
}

export default Layout;
