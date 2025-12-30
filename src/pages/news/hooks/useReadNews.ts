import { useQuery } from '@tanstack/react-query';
import news from '../../../helpers/api/news';

export default function useReadNews(id?: number) {
  const readNews = () => {
    return news.getNewsById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-news', id],
    queryFn: readNews,
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
