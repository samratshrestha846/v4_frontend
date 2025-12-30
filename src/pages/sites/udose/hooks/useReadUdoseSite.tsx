import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import udose from '../../../../helpers/api/udose';

export default function useReadUdoseSite() {
  const { id } = useParams();

  const getUdoseSiteById = () => {
    return udose.getUdoseSiteById(id);
  };

  const { data, isFetching, isFetched, isError, refetch } = useQuery({
    queryKey: ['read-udose-site', id],
    queryFn: getUdoseSiteById,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    refetch,
  };
}
