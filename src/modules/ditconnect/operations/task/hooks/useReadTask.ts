import { useQuery } from '@tanstack/react-query';
import { TASK } from '../constants/constant';
import HttpApi from '../../../Http/http';
import { TaskResponse } from '../types/Task';

export default function useReadTask(id?: string) {
  const apiCore = new HttpApi();
  const readTask = async (): Promise<TaskResponse> => {
    const response = await apiCore.get(`${TASK}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<TaskResponse>({
    queryKey: ['Task', id],
    queryFn: readTask,
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
