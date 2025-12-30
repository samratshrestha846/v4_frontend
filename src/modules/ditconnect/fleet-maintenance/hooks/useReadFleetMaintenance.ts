import { useQuery } from '@tanstack/react-query';
import { FLEET_MAINTENANCE } from '../constants/constant';
import HttpApi from '../../Http/http';
import { FleetMaintenanceResponse } from '../types/FleetMaintenance';

export default function useReadFleetMaintenance(id?: string) {
  const apiCore = new HttpApi();
  const readFleetMaintenance = async (): Promise<FleetMaintenanceResponse> => {
    const response = await apiCore.get(`${FLEET_MAINTENANCE}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['fleet-maintenance', id],
    queryFn: readFleetMaintenance,
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
