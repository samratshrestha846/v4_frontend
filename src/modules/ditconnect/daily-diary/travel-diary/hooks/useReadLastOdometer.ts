import { useQuery } from '@tanstack/react-query';
import { prepareDynamicUrl } from '@uhub/helpers';
import { TRAVEL_DIARY_READ_ODOMETER_READING } from '../constants/constant';
import HttpApi from '../../../Http/http';
import { TravelDiaryResponse } from '../types/TravelDiary';

export default function useReadLastOdometer(id?: string) {
  const apiCore = new HttpApi();
  const readLastOdometer = async (): Promise<TravelDiaryResponse> => {
    const response = await apiCore.get(
      prepareDynamicUrl(TRAVEL_DIARY_READ_ODOMETER_READING, id)
    );
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<TravelDiaryResponse>({
      queryKey: ['ReadOdometerReading', id],
      queryFn: readLastOdometer,
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
