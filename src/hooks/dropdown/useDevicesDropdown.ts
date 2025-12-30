/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { DeviceDropdownQueryParams } from '../../types/device/device';
import { STATUS_TEST_SITE } from '../../constants/constants';

type Props = {
  action?: string;
  device_type?: string;
  isDependentQuery?: boolean;
  status?: number;
  deviceId?: number;
  isDependencyFetched?: boolean;
};

export default function useDevicesDropdown({
  action,
  device_type,
  isDependentQuery,
  status,
  deviceId,
  isDependencyFetched,
}: Props) {
  const prepareQueryParams = (): DeviceDropdownQueryParams => {
    const filterParams: any = {};
    if (action) {
      filterParams.action = action;
    }

    if (device_type) {
      filterParams.device_type = device_type;
    }

    if (deviceId) {
      filterParams.device_id = deviceId;
    }

    if (status === STATUS_TEST_SITE) {
      filterParams.is_test_site = true;
    }
    return filterParams;
  };

  const fetchDevicesDropdown = async () => {
    const params = prepareQueryParams();
    const { body } = await apiDropdown.fetchDevices(params);
    return body.map((item: any) => ({
      value: item.id,
      label: item.serial_number,
    }));
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['devices-dropdown'],
    queryFn: fetchDevicesDropdown,
    enabled: isDependentQuery ? !!isDependencyFetched : true,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
