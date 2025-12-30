import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import filterByFromToDateQueryParams from '../../../../helpers/filterHelper';
import { MaintenanceNotesQueryParams } from '../../../../types/notes/maintenance';
import maintenanceNotes from '../../../../helpers/api/notes/maintenanceNotes';
import { formattedYmdDate } from '../../../../helpers';
import {
  PAGINATION_PAGE_NUMBER_0,
  PAGINATION_PAGE_SIZE,
  SORTING_ORDER_ASC,
  SORTING_ORDER_DESC,
} from '../../../../constants/constants';

export default function useListMaintenanceNotes() {
  // Pagination variable
  const [pageNumber, setPageNumber] = useState(PAGINATION_PAGE_NUMBER_0);

  // sorting variables
  const [sort, setSort] = useState<string>();
  const [direction, setDirection] = useState<string>();

  // filtering variables
  const [duration, setDuration] = useState<string>();
  const [property, setProperty] = useState<number>();
  const [serialNumber, setSerialNumber] = useState<number>();
  const [performer, setPerformer] = useState<number>();

  const prepareQueryParams = () => {
    const params: MaintenanceNotesQueryParams = {
      page: pageNumber + 1,
      page_size: PAGINATION_PAGE_SIZE,
    };

    if (sort) {
      params.sort = sort;
    }
    if (direction) {
      params.direction = direction;
    }
    if (duration) {
      const dateRange = filterByFromToDateQueryParams(duration);
      params.date_from = formattedYmdDate(dateRange.as_of_date_from);
      params.date_to = formattedYmdDate(dateRange.as_of_date_to);
    }
    if (property) {
      params.customer_property_id = property;
    }
    if (serialNumber) {
      params.device_serial_number = serialNumber;
    }
    if (performer) {
      params.performer_id = performer;
    }
    return params;
  };

  const listMaintenanceNotes = async () => {
    const params = prepareQueryParams();
    return maintenanceNotes.fetchMaintenanceNotes(params);
  };

  const { data, isFetching, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: listMaintenanceNotes,
    queryKey: [
      'list-maintenance-notes',
      pageNumber,
      sort,
      direction,
      duration,
      property,
      serialNumber,
      performer,
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
    setPageNumber(PAGINATION_PAGE_NUMBER_0);
  };

  return {
    pageNumber,
    sort,
    direction,
    data,
    isFetching,
    isError,
    handlePageChange,
    handleTabeDataSorting,
    duration,
    setDuration,
    property,
    setProperty,
    serialNumber,
    setSerialNumber,
    performer,
    setPerformer,
  };
}
