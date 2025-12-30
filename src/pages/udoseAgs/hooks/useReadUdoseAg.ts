import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import udoseAgs from '../../../helpers/api/udoseAgs';

export default function useReadUdoseAg() {
  const { id } = useParams();

  const getUdoseAgById = () => {
    return udoseAgs.getUdoseAgById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-udose-ag', id],
    queryFn: getUdoseAgById,
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
