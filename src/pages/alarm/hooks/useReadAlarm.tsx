import { useQuery } from '@tanstack/react-query';
import apiAlarm from '../../../helpers/api/alarm';

export default function useReadAlarm(id: number) {
  const getAlarmById = () => {
    return apiAlarm.readAlarmById(id);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['read-alarm', id],
    queryFn: getAlarmById,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isError,
  };
}
