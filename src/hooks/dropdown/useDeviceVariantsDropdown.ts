import { useQuery } from '@tanstack/react-query';
import dropown from '../../helpers/api/dropdown';
import { DeviceConfiguration } from '../../types/device/deviceConfiguration';
import { capitalizeWordFirstLetter } from '../../helpers';
import { LabelValueDropdown } from '../../types/common';

export default function useDeviceVariantsDropdown(id?: number) {
  const fetchDeviceConfigurationsDropdown = async () => {
    const { body }: { body: DeviceConfiguration[] } =
      await dropown.fetchDeviceConfigurations();
    const deviceConfiguration = body?.find((item) => item.id === id);
    const options: LabelValueDropdown[] =
      deviceConfiguration?.variants?.map((item: string) => ({
        value: item,
        label: capitalizeWordFirstLetter(item.replace('_', ' ')),
      })) ?? [];
    return options;
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['device-configurations-dropdown', id],
    queryFn: fetchDeviceConfigurationsDropdown,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
