import { useQuery } from '@tanstack/react-query';
import { RESPONSE_SET } from '../constants/constant';
import HttpApi from '../../Http/http';
import { ResponseSetResponse } from '../types/ResponseSet';

export default function useReadResponseSet(id?: string) {
  const apiCore = new HttpApi();
  const readResponseSet = async (): Promise<ResponseSetResponse> => {
    const response = await apiCore.get(`${RESPONSE_SET}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<ResponseSetResponse>({
      queryKey: ['ResponseSet', id],
      queryFn: readResponseSet,
      refetchOnWindowFocus: false,
      enabled: !!id,
    });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
