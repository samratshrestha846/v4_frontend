import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import udose from '../../../../../../../helpers/api/udose';

export default function useSiteFollowupData() {
  const [pageNumber, setPageNumber] = useState(0);
  const { id } = useParams();

  const prepareQueryParameters = () => {
    const params: any = { page: pageNumber + 1 };
    return params;
  };

  const fetchSiteFollowup = () => {
    const params = prepareQueryParameters();
    return udose.getUdoseSitesFollowup(id, params);
  };

  const handlePageChange = (e: any) => {
    setPageNumber(e.selected);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['fetch-site-followup', pageNumber],
    queryFn: fetchSiteFollowup,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    handlePageChange,
  };
}
