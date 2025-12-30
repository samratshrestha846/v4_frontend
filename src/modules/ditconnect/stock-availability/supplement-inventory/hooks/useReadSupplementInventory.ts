import { useQuery } from '@tanstack/react-query';
import { SUPPLEMENT_INVENTORY } from '../constants/constant';
import HttpApi from '../../../Http/http';
import { SupplementInventoryViewResponse } from '../types/SupplementInventory';

export default function useReadSupplementInventory(id?: string) {
  const apiCore = new HttpApi();
  const readSupplementInventory =
    async (): Promise<SupplementInventoryViewResponse> => {
      const response = await apiCore.get(`${SUPPLEMENT_INVENTORY}/${id}`);
      return response.data.data;
    };
  const { data, isFetching, isFetched, isError } =
    useQuery<SupplementInventoryViewResponse>({
      queryKey: ['SupplementInventory', id],
      queryFn: readSupplementInventory,
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
