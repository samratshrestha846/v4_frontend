import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import udoseSiteHealth from '../../../../../helpers/api/udoseSiteHealth';

export default function useCheckUdoseSiteHealth() {
  const { id } = useParams();

  const getHealthCheckById = () => {
    return udoseSiteHealth.getHealthCheckById(id);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['get-helath-check-by-id', id],
    queryFn: getHealthCheckById,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isError,
  };
}
