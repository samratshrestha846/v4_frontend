import { useQuery } from '@tanstack/react-query';
import { PURCHASE_REQUEST } from '../constants/constant';
import HttpApi from '../../Http/http';
import { PurchaseRequestResponse } from '../types/PurchaseRequest';

export default function useReadPurchaseRequest(id?: string) {
  const apiCore = new HttpApi();
  const readPurchaseRequest = async (): Promise<PurchaseRequestResponse> => {
    const response = await apiCore.get(`${PURCHASE_REQUEST}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<PurchaseRequestResponse>({
      queryKey: ['PurchaseRequest', id],
      queryFn: readPurchaseRequest,
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
