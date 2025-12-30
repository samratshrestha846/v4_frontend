import { useQuery } from '@tanstack/react-query';
import device from '../../../helpers/api/device';

const useFetchDeviceCount = () => {
  const fetchDeviceCount = async () => {
    const response = await device.fetchDeviceCountByStockType();

    // exclude provisioned device stock type
    const filteredData = response?.body?.filter(
      (item) => item.stock_type?.slug !== 'provisioned'
    );
    return { ...response, body: filteredData };
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['device-count'],
    queryFn: fetchDeviceCount,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isError,
  };
};

export default useFetchDeviceCount;
