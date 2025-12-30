import { useQuery } from '@tanstack/react-query';
import { MESSAGE } from '../constants/constant';
import HttpApi from '../../Http/http';
import { MessageResponse } from '../types/Message';

export default function useReadMessage(id?: string) {
  const apiCore = new HttpApi();
  const readMessage = async (): Promise<MessageResponse> => {
    const response = await apiCore.get(`${MESSAGE}/${id}`);

    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<MessageResponse>({
    queryKey: ['Message', id],
    queryFn: readMessage,
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
