import { useQuery } from '@tanstack/react-query';
import cleanedParams from '../helper';
import HttpApi from '../Http/http';

interface UseFetchListOptions {
  refetchOnWindowFocus?: boolean;
  retry?: boolean;
  // eslint-disable-next-line no-unused-vars
  transform?: (data: any) => any;
}

export default function useFetchList<T>(
  endpoint: string,
  params: Record<string, any>,
  options: UseFetchListOptions = { refetchOnWindowFocus: false, retry: false }
) {
  const httpApi = new HttpApi();

  const fetchList = async (): Promise<T> => {
    const response = await httpApi.get(endpoint, cleanedParams(params));
    const transformedData = options.transform
      ? options.transform(response.data)
      : response.data;
    return transformedData;
  };

  const { data, isFetching, isError } = useQuery<T>(
    [endpoint, ...Object.values(params)],
    fetchList,
    {
      ...options,
    }
  );

  return { data, isFetching, isError };
}
