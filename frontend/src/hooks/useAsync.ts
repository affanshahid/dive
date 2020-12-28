import { useCallback, useState } from 'react';

export type Status = 'pending' | 'resolved' | 'rejected' | 'idle';

export type AnyFunc = (...args: any[]) => any;

export interface UseAsync<T extends AnyFunc> {
  status: Status;
  run: T;
  error: any;
}

export function useAsync<T extends AnyFunc>(fn: T): UseAsync<T> {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<any>(null);

  const run = useCallback(
    async (...args: Parameters<T>) => {
      setStatus('pending');
      try {
        const result = await fn(...args);
        setStatus('resolved');
        return result;
      } catch (err) {
        setStatus('rejected');
        setError(err);
        throw err;
      }
    },
    [fn]
  );

  //@ts-ignore
  return { status, run, error };
}
