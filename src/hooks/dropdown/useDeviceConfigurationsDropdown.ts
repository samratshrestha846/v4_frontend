import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useDeviceConfigurationsDropdown() {
  const fetchDeviceConfigurationsDropdown = async () => {
    const { body } = await apiDropdown.fetchDeviceConfigurations();
    return body?.map((item: any) => ({
      value: item?.id,
      label: item?.name,
    }));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['device-configurations-dropdown '],
    queryFn: fetchDeviceConfigurationsDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
