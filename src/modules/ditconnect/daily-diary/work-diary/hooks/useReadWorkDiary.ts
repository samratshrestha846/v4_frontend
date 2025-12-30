import { useQuery } from '@tanstack/react-query';
import { WORK_DIARY } from '../constants/constant';
import HttpApi from '../../../Http/http';
import { WorkDiaryResponse } from '../types/WorkDiary';

export default function useReadWorkDiary(id?: string) {
  const apiCore = new HttpApi();
  const readWorkDiary = async (): Promise<WorkDiaryResponse> => {
    const response = await apiCore.get(`${WORK_DIARY}/${id}`);
    return response.data.data;
  };

  const { data, isFetching, isFetched, isError } = useQuery<WorkDiaryResponse>({
    queryKey: ['WorkDiary', id],
    queryFn: readWorkDiary,
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
