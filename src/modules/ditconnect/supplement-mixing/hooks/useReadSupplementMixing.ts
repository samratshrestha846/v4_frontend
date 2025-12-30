import { useQuery } from '@tanstack/react-query';
import { SUPPLEMENT_MIXING } from '../constants/constant';
import HttpApi from '../../Http/http';
import { SupplementMixingResponse } from '../types/SupplementMixing';

export default function useReadSupplementMixing(id?: string) {
  const apiCore = new HttpApi();
  const readSupplementMixing = async (): Promise<SupplementMixingResponse> => {
    const response = await apiCore.get(`${SUPPLEMENT_MIXING}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<SupplementMixingResponse>({
      queryKey: ['SupplementMixing', id],
      queryFn: readSupplementMixing,
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
