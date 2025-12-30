/* eslint-disable import/prefer-default-export */
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  InvalidateQueryFilters,
} from '@tanstack/react-query';

export function useRequestProcessor() {
  const queryClient = useQueryClient();

  const query = (queryKey: any, queryFn = () => {}, options = {}) => {
    return useQuery({
      queryKey,
      queryFn,
      refetchOnWindowFocus: false,
      ...options,
    });
  };

  const mutation = ({
    mutationKey,
    mutationFn = () => {},
    onSuccess = () => {},
    onError = () => {},
    options = {},
  }: {
    mutationKey: InvalidateQueryFilters<unknown>;
    mutationFn: any;
    onSuccess: any;
    onError: any;
    options: Object;
  }) => {
    return useMutation({
      mutationFn,
      onSuccess,
      onError,
      onSettled: () => queryClient.invalidateQueries(mutationKey),
      ...options,
    });
  };

  const infiniteQuery = ({
    queryKey = [],
    queryFn = () => {},
    options = {},
  }) => {
    return useInfiniteQuery({
      queryKey,
      queryFn,
      refetchOnWindowFocus: false,
      ...options,
    });
  };

  return { query, mutation, infiniteQuery };
}
