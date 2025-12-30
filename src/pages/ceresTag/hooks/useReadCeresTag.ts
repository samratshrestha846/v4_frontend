import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ceresTagAPI from '../../../helpers/api/ceresTagAPI';

export default function useReadCeresTag() {
  const { id } = useParams();

  const getCeresTagById = () => {
    return ceresTagAPI.getCeresTagById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['ceres-tag-by-id', id],
    queryFn: getCeresTagById,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
