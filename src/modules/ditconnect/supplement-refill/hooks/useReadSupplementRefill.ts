import { useQuery } from '@tanstack/react-query';
import { SUPPLEMENT_REFILL } from '../constants/constant';
import HttpApi from '../../Http/http';
import { SupplementRefillResponse } from '../types/SupplementRefill';

export default function useReadSupplementRefill(id?: string) {
  const apiCore = new HttpApi();
  const readSupplementRefill = async (): Promise<SupplementRefillResponse> => {
    const response = await apiCore.get(`${SUPPLEMENT_REFILL}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<SupplementRefillResponse>({
      queryKey: ['SupplementRefill', id],
      queryFn: readSupplementRefill,
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
