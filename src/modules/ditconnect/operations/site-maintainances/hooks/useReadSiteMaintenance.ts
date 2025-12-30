import { useQuery } from '@tanstack/react-query';
import HttpApi from '../../../Http/http';
import { SITE_MAINTENANCES } from '../constants/constant';

export default function useReadSiteMaintenance(id?: string) {
  const apiCore = new HttpApi();
  const readSiteMaintenance = async () => {
    const response = await apiCore.get(`${SITE_MAINTENANCES}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['site-maintenance', id],
    queryFn: readSiteMaintenance,
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
