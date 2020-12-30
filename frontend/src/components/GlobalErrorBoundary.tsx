import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Spinner,
} from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import { extractError } from '../utils/errors';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    async function effect() {
      setIsLoading(true);
      const result = await extractError(error);
      setErrorMsg(result);
      setIsLoading(false);
    }

    effect();
  }, [error]);

  let description: ReactNode = errorMsg;

  if (isLoading) description = <Spinner />;

  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>An error occurred</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <CloseButton
        onClick={resetErrorBoundary}
        position="absolute"
        right="8px"
        top="8px"
      />
    </Alert>
  );
}

export interface GlobalErrorBoundaryProps {
  children?: ReactNode;
}

export function GlobalErrorBoundary({
  children = null,
}: GlobalErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      {children}
    </ErrorBoundary>
  );
}
