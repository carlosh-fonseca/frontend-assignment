import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export function useLoadData<T>(
  key: QueryKey,
  fn: QueryFunction,
  options?: object,
): UseQueryResult<T> {
  return useQuery({
    queryKey: key,
    queryFn: fn,
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
}
