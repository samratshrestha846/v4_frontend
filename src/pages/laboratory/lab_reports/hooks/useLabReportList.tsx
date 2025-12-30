import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { LabReportQueryParams } from '../../../../types/lab/labReport';
import labReport from '../../../../helpers/api/labReport';

export default function useLabReportList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');

  const [status, setStatus] = useState<string>();

  const prepareQueryParams = () => {
    const params: LabReportQueryParams = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }

    if (status) {
      params.status = status;
    }

    return params;
  };

  const fetchLabReports = () => {
    const params: LabReportQueryParams = prepareQueryParams();
    return labReport.fetchLabReports(params);
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['lab-reports', search, pageNumber, status],
    fetchLabReports,
    { refetchOnWindowFocus: false }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  return {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    status,
    setStatus,
    setSearch,
  };
}
