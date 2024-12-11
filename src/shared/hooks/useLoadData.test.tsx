import { test, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { useLoadData } from './useLoadData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

test('call loadData', async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const { result } = renderHook(() => useLoadData(['test'], () => 'Hello'), {
    wrapper,
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual('Hello');
});
