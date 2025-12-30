import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import device from '../../../helpers/api/device';

export default function useReadDevice() {
  const { id } = useParams();

  const getDeviceById = () => {
    return device.getDeviceById(id);
  };

  const { data, isFetching, isFetched, refetch, isError } = useQuery({
    queryKey: ['read-device', id],
    queryFn: getDeviceById,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    refetch,
    isError,
  };
}
