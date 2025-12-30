import { useQuery } from '@tanstack/react-query';
import { SUPPLEMENT_SALE } from '../constants/constant';
import HttpApi from '../../Http/http';
import { SupplementSaleResponse } from '../types/SupplementSale';

export default function useReadSupplementSale(id?: string) {
  const apiCore = new HttpApi();
  const readSupplementSale = async (): Promise<SupplementSaleResponse> => {
    const response = await apiCore.get(`${SUPPLEMENT_SALE}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<SupplementSaleResponse>({
      queryKey: ['SupplementSale', id],
      queryFn: readSupplementSale,
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
