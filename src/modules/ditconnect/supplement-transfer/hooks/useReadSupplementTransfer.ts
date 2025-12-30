import { useQuery } from '@tanstack/react-query';
import { SUPPLEMENT_TRANSFER } from '../constants/constant';
import HttpApi from '../../Http/http';
import { SupplementTransferResponse } from '../types/SupplementTransfer';

export default function useReadSupplementTransfer(id?: string) {
  const apiCore = new HttpApi();
  const readSupplementTransfer =
    async (): Promise<SupplementTransferResponse> => {
      const response = await apiCore.get(`${SUPPLEMENT_TRANSFER}/${id}`);
      return response.data.data;
    };
  const { data, isFetching, isFetched, isError } =
    useQuery<SupplementTransferResponse>({
      queryKey: ['SupplementTransfer', id],
      queryFn: readSupplementTransfer,
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
