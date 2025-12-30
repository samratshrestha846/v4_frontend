import { useQuery } from '@tanstack/react-query';
import { TECH_INVENTORY } from '../constants/constant';
import HttpApi from '../../../Http/http';
import { TechInventoryResponse } from '../types/TechInventory';

export default function useReadTechInventory(id?: string) {
  const apiCore = new HttpApi();
  const readTechInventory = async (): Promise<TechInventoryResponse> => {
    const response = await apiCore.get(`${TECH_INVENTORY}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<TechInventoryResponse>({
      queryKey: ['TechInventory', id],
      queryFn: readTechInventory,
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
