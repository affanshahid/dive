import { Box, Spinner } from '@chakra-ui/react';
import React, { ReactNode, Suspense } from 'react';
import { GlobalErrorBoundary } from './GlobalErrorBoundary';
import Header from './Header';

export interface LayoutProps {
  children?: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Header />
      <Suspense fallback={<Spinner />}>
        <GlobalErrorBoundary>{children}</GlobalErrorBoundary>
      </Suspense>
    </Box>
  );
}

export default Layout;
