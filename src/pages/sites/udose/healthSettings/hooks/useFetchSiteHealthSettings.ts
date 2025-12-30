import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import siteHealthSettings from '../../../../../helpers/api/udose/healthCheckSettings';

export default function useFetchSiteHealthSettings() {
  const { id } = useParams();
  const getSiteHealthCheckSettings = () => {
    return siteHealthSettings.getSiteHealthCheckSettings(id);
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    queryKey: ['site-health-check-settings', id],
    queryFn: getSiteHealthCheckSettings,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
