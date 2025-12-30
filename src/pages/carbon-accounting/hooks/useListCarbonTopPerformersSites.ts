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

export default function useListCarbonTopPerformersSites() {
  const [pageNumber, setPageNumber] = useState(0);
  const [duration, setDuration] = useState<string>(DURATION_YEAR_TO_DATE);
  const [customer, setCustomer] = useState<number>();
  const [property, setProperty] = useState<number>();
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');
  const [pageSize, setPageSize] = useState<number>(5);

  const ListCarbonTopPerformerSites = () => {
    const params: CarbonTopPerformerQueryParameters = { page: pageNumber + 1 };

    if (duration) {
      const durationTime = filterByFromToDateQueryParams(duration);
      params.date_from = formattedYmdDate(durationTime.as_of_date_from);
      params.date_to = formattedYmdDate(durationTime.as_of_date_to);
    }

    if (pageSize) {
      params.page_size = pageSize;
    }

    if (customer) {
      params.customer_id = customer;
    }

    if (property) {
      params.customer_property_id = property;
    }

    return carbonAccounting.fetchCarbonTopPerformersSites(params);
  };

  const { data, isFetching, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: ListCarbonTopPerformerSites,
    queryKey: [
      'list-carbon-top-performer-sites',
      pageNumber,
      duration,
      customer,
      property,
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
    customer,
    setCustomer,
    property,
    setProperty,
    sort,
    direction,
    handleTabeDataSorting,
    pageSize,
    setPageSize,
  };
}
