import { useQuery } from '@tanstack/react-query';
import { TRAVEL_DIARY } from '../constants/constant';
import HttpApi from '../../../Http/http';
import { TravelDiaryResponse } from '../types/TravelDiary';

export default function useReadTravelDiary(id?: string) {
  const apiCore = new HttpApi();
  const readTravelDiary = async (): Promise<TravelDiaryResponse> => {
    const response = await apiCore.get(`${TRAVEL_DIARY}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<TravelDiaryResponse>({
      queryKey: ['TravelDiary', id],
      queryFn: readTravelDiary,
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
