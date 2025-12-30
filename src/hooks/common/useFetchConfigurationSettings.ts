import { useQuery } from '@tanstack/react-query';
import common from '../../helpers/api/common';

export default function useFetchConfigurationSettings() {
  const fetchConfigurationSettings = () => {
    return common.fetchConfigurationSettings();
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['configuration-settings'],
    queryFn: fetchConfigurationSettings,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
