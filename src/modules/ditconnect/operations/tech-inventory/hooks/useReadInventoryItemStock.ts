import { useQuery } from '@tanstack/react-query';
import { TECH_INVENTORY_ITEM_STOCK } from '../constants/constant';
import HttpApi from '../../../Http/http';
import { InventoryItemStock } from '../types/TechInventory';

export default function useReadInventoryItemStock(id?: string) {
  const apiCore = new HttpApi();
  const readInventoryItem = async (): Promise<InventoryItemStock> => {
    const response = await apiCore.get(`${TECH_INVENTORY_ITEM_STOCK}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<InventoryItemStock>(
    {
      queryKey: ['InventoryItemStock', id],
      queryFn: readInventoryItem,
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
