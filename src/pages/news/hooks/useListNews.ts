import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { debounce } from 'lodash';
import news from '../../../helpers/api/news';
import { NewsFilterParams } from '../../../types/news';

export default function useListNews() {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState<string>('');
  const [isPublished, setIsPublished] = useState<number>();

  const prepareQueryParameters = () => {
    const params: NewsFilterParams = { page: pageNumber + 1 };

    if (search) {
      params.search = search;
    }

    if (isPublished !== undefined) {
      params.is_published = isPublished;
    }

    return params;
  };

  const fetchNewsList = () => {
    const params = prepareQueryParameters();
    return news.fetchNewsList(params);
  };

  const handlePageChange = (e: any) => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['fetch-news-list', pageNumber, isPublished, search],
    queryFn: fetchNewsList,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    handlePageChange,
    isPublished,
    setIsPublished,
    search,
    handleSearchOnChange,
  };
}
