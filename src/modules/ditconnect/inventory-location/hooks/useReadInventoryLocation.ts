import { useQuery } from '@tanstack/react-query';
import { INVENTORY_LOCATION } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useReadInventoryLocation(id?: string) {
  const apiCore = new HttpApi();
  const readInventoryLocation = async () => {
    const response = await apiCore.get(`${INVENTORY_LOCATION}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['InventoryLocation', id],
    queryFn: readInventoryLocation,
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
