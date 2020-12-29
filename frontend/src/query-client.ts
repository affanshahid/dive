import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { useErrorBoundary: true },
    queries: { useErrorBoundary: true },
  },
});
