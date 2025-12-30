import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import supplementDeliveryNotesAPI from '../../../../helpers/api/supplementDeliveryNotes';
import { SupplementDeliveryQueryParams } from '../../../../types/notes/supplementDeliveries';
import { formattedYmdDate } from '../../../../helpers';
import filterByFromToDateQueryParams from '../../../../helpers/filterHelper';

export default function useListSupplementDeliveryNote() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [performerId, setPerformerId] = useState<number>();
  const [customerPropertyId, setCustomerPropertyId] = useState<number>();
  const [duration, setDuration] = useState<string>();
  const [sort, setSort] = useState<string>();
  const [direction, setDirection] = useState<string>();

  const prepareQueryParameters = () => {
    const params: SupplementDeliveryQueryParams = {
      page: pageNumber + 1,
      page_size: 10,
    };

    if (duration) {
      const durationTime = filterByFromToDateQueryParams(duration);
      params.date_from = formattedYmdDate(durationTime.as_of_date_from);
      params.date_to = formattedYmdDate(durationTime.as_of_date_to);
    }

    if (performerId) {
      params.performer_id = performerId;
    }
    if (customerPropertyId) {
      params.customer_property_id = customerPropertyId;
    }

    if (sort) {
      params.sort = sort;
    }

    if (direction) {
      params.direction = direction;
    }

    return params;
  };

  const listSupplementDeliveryNote = () => {
    const params: SupplementDeliveryQueryParams = prepareQueryParameters();
    return supplementDeliveryNotesAPI.supplementDeliveriesList(params);
  };

  const { data, isFetching, isError } = useQuery(
    [
      'list-supplement-delivery-notes',
      pageNumber,
      customerPropertyId,
      performerId,
      duration,
    ],
    listSupplementDeliveryNote,
    { refetchOnWindowFocus: false }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleTabeDataSorting = (clickedColumn: string) => {
    setDirection(direction === 'asc' ? 'desc' : 'asc');
    setSort(clickedColumn);
    setPageNumber(0);
  };

  return {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    performerId,
    setPerformerId,
    customerPropertyId,
    setCustomerPropertyId,
    duration,
    setDuration,
    sort,
    direction,
    handleTabeDataSorting,
  };
}
