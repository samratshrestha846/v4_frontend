import { useQuery } from '@tanstack/react-query';
import { SUPPLEMENT } from '../constants/constant';
import HttpApi from '../../Http/http';
import { SupplementResponse } from '../types/Supplement';

export default function useReadSupplement(id?: string) {
  const apiCore = new HttpApi();
  const readSupplement = async (): Promise<SupplementResponse> => {
    const response = await apiCore.get(`${SUPPLEMENT}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<SupplementResponse>(
    {
      queryKey: ['Supplement', id],
      queryFn: readSupplement,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
