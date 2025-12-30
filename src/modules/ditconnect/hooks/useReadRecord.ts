import { useQuery } from '@tanstack/react-query';
import HttpApi from '../Http/http';

export default function useReadRecord<T>(endpoint: string) {
  const httpApi = new HttpApi();

  const fetch = async (): Promise<T> => {
    const response = await httpApi.get(endpoint);
    return response.data.data;
  };

  const { data, isFetching, isError } = useQuery<T>([endpoint], fetch);

  return { data, isFetching, isError };
}
