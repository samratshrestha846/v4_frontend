import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import apiUdose from '../../../../../../../helpers/api/udose';
import { UdoseStopReasonFilterParam } from '../../../../../../../types/udose/udoseStopReason';
import {
  PAGINATION_PAGE_NUMBER_0,
  SORTING_ORDER_ASC,
  SORTING_ORDER_DESC,
} from '../../../../../../../constants/constants';

export default function useListUdoseStopReason(siteId: number) {
  // pagination variables
  const [pageNumber, setPageNumber] = useState<number>(
    PAGINATION_PAGE_NUMBER_0
  );

  // sorting variables
  const [sort, setSort] = useState<string>();
  const [direction, setDirection] = useState<string>();

  // prepare query params
  const prepareQueryParams = () => {
    const params: UdoseStopReasonFilterParam = { page: pageNumber + 1 };
    params.page_size = 5;

    if (siteId) {
      params.site_id = siteId;
    }

    if (sort) {
      params.sort = sort;
    }

    if (direction) {
      params.direction = direction;
    }

    return params;
  };

  //  fetch list
  const fetchUdoseStopReasons = () => {
    const params = prepareQueryParams();
    return apiUdose.fetchUdoseStopReasons(params);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchUdoseStopReasons,
    queryKey: ['logs', siteId, pageNumber, sort, direction],
  });

  // handle pagination
  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  // handle sorting
  const handleTabeDataSorting = (clickedColumn: string) => {
    setDirection(
      direction === SORTING_ORDER_ASC ? SORTING_ORDER_DESC : SORTING_ORDER_ASC
    );
    setSort(clickedColumn);
    setPageNumber(0);
  };

  return {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    sort,
    direction,
    handleTabeDataSorting,
    refetch,
  };
}
