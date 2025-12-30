import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { debounce } from 'lodash';
import deviceLogs from '../../../helpers/api/deviceLogs';
import { DeviceLogQueryParams } from '../../../types/device/deviceLogs';
import {
  SORTING_ORDER_ASC,
  SORTING_ORDER_DESC,
} from '../../../constants/constants';
import filterByFromToDateQueryParams from '../../../helpers/filterHelper';

type Props = {
  siteId?: number;
  deviceId?: number;
};

export default function useListDeviceLogs({ siteId, deviceId }: Props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');
  const [duration, setDuration] = useState<string>();
  const [action, setAction] = useState<string>();

  const prepareQueryParams = () => {
    const params: DeviceLogQueryParams = { page: pageNumber + 1 };

    if (deviceId) {
      params.device_id = deviceId;
    }

    if (siteId) {
      params.site_id = siteId;
    }

    if (search) {
      params.search = search;
    }

    if (sort) {
      params.sort_by = sort;
    }

    if (direction) {
      params.sort_direction = direction;
    }

    if (action) {
      params.action_type = action;
    }

    if (duration) {
      const { as_of_date_from: dateFrom, as_of_date_to: dateTo } =
        filterByFromToDateQueryParams(duration);
      params.date_from = moment(dateFrom).format('YYYY-MM-DD');
      params.date_to = moment(dateTo).format('YYYY-MM-DD');
    }

    return params;
  };

  const listDeviceLogs = () => {
    const params = prepareQueryParams();
    return deviceLogs.listDeviceLogs(params);
  };

  const { data, isFetching, isError } = useQuery(
    [
      'list-device-logs',
      pageNumber,
      search,
      sort,
      direction,
      duration,
      action,
      siteId,
      deviceId,
    ],
    listDeviceLogs,
    { refetchOnWindowFocus: false }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

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
    search,
    handlePageChange,
    handleSearchOnChange,
    sort,
    setSort,
    direction,
    setDirection,
    handleTabeDataSorting,
    duration,
    setDuration,
    action,
    setAction,
  };
}
