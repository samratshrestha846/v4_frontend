import { useQuery } from '@tanstack/react-query';
import { FLEET_VEHICLE } from '../constants/constant';
import { FleetVehicleResponse } from '../types/FleetVehicle';
import HttpApi from '../../Http/http';

export default function useReadFleetVehicle(id?: string) {
  const apiCore = new HttpApi();
  const readFleetVehicle = async (): Promise<FleetVehicleResponse> => {
    const { data } = await apiCore.get(`${FLEET_VEHICLE}/${id}`);
    if (data.data.purchased_date) {
      data.data.purchased_date = new Date(data.data.purchased_date);
    }
    if (data.data.rego_until) {
      data.data.rego_until = new Date(data.data.rego_until);
    }

    if (data.data.next_service_due) {
      data.data.next_service_due = new Date(data.data.next_service_due);
    }
    return data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['fleet-vehicle', id],
    queryFn: readFleetVehicle,
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
