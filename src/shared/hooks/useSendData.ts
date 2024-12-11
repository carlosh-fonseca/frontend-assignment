import { MutationFunction, useMutation } from '@tanstack/react-query';

export function useSendData<TParams, TResponse = unknown, TError = unknown>(
  fn: MutationFunction<TResponse, TParams>,
  success?: (arg0: TResponse) => void,
  error?: (arg0: TError) => void,
  options?: object,
) {
  return useMutation<TResponse, TError, TParams, unknown>({
    mutationFn: fn,
    onSuccess: (data) => {
      if (success) success(data);
      return success;
    },
    onError: error,
    ...options,
  });
}
