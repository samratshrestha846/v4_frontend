import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import carbonAccounting from '../../../helpers/api/carbonCreditAccounting';
import filterByFromToDateQueryParams from '../../../helpers/filterHelper';
import { formattedYmdDate } from '../../../helpers';
import { DURATION_YEAR_TO_DATE } from '../../../constants/durationOptions';
import {
  SORTING_ORDER_ASC,
  SORTING_ORDER_DESC,
} from '../../../constants/constants';
import { CarbonTopPerformerQueryParameters } from '../../../types/carbon-accounting/carbonAccounting';

export default function useListCarbonTopPerformersCustomers() {
  const [pageNumber, setPageNumber] = useState(0);
  const [duration, setDuration] = useState<string>(DURATION_YEAR_TO_DATE);
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');
  const [pageSize, setPageSize] = useState<number>(5);

  const ListCarbonTopPerformerCustomers = () => {
    const params: CarbonTopPerformerQueryParameters = { page: pageNumber + 1 };

    if (pageSize) {
      params.page_size = pageSize;
    }

    if (sort) {
      params.sort_by = sort;
    }

    if (direction) {
      params.sort_direction = direction;
    }

    if (duration) {
      const durationTime = filterByFromToDateQueryParams(duration);
      params.date_from = formattedYmdDate(durationTime.as_of_date_from);
      params.date_to = formattedYmdDate(durationTime.as_of_date_to);
    }

    return carbonAccounting.fetchCarbonTopPerformersCustomers(params);
  };

  const { data, isFetching, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: ListCarbonTopPerformerCustomers,
    queryKey: [
      'list-carbon-top-performer-customers',
      pageNumber,
      duration,
      sort,
      direction,
      pageSize,
    ],
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleTabeDataSorting = (clickedColumn: string) => {
    setDirection(
      direction === SORTING_ORDER_ASC ? SORTING_ORDER_DESC : SORTING_ORDER_ASC
    );
    setSort(clickedColumn);
    setPageNumber(0);
  };

  return {
    pageNumber,
    data,
    isFetching,
    isError,
    handlePageChange,
    duration,
    setDuration,
    sort,
    setSort,
    direction,
    setDirection,
    handleTabeDataSorting,
    pageSize,
    setPageSize,
  };
}
