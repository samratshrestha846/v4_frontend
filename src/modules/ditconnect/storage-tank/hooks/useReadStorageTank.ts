import { useQuery } from '@tanstack/react-query';
import { STORAGE_TANK } from '../constants/constant';
import HttpApi from '../../Http/http';
import { StorageTankResponse } from '../types/StorageTank';

export default function useReadStorageTank(id?: string) {
  const apiCore = new HttpApi();
  const readStorageTank = async (): Promise<StorageTankResponse> => {
    const response = await apiCore.get(`${STORAGE_TANK}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<StorageTankResponse>({
      queryKey: ['StorageTank', id],
      queryFn: readStorageTank,
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
