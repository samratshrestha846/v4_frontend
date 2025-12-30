import { useQuery } from '@tanstack/react-query';
import { prepareDynamicUrl } from '@uhub/helpers';
import { ACTIVITY_LOG_SHOW } from '../constants/constant';
import HttpApi from '../../Http/http';
import { ActivityLogResponse } from '../types/ActivityLog';

export default function useReadActivityLog(id?: string) {
  const apiCore = new HttpApi();
  const readActivityLog = async () => {
    const response = await apiCore.get(
      prepareDynamicUrl(ACTIVITY_LOG_SHOW, id)
    );
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } =
    useQuery<ActivityLogResponse>({
      queryKey: ['ActivityLog', id],
      queryFn: readActivityLog,
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
