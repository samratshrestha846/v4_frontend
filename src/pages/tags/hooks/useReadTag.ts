import { useQuery } from '@tanstack/react-query';
import tag from '../../../helpers/api/tag';

export default function useReadTag(id?: number) {
  const readTag = () => {
    return tag.readTag(id);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: readTag,
    queryKey: ['read-tag', id],
    enabled: !!id,
  });

  return { data, isFetching, isError, refetch };
}
