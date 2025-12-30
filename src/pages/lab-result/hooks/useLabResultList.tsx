import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LabReportQueryParams } from '../../../types/lab/labReport';
import labReport from '../../../helpers/api/labReport';

export default function useLabResultList() {
  const [pageNumber, setPageNumber] = useState(0);

  const prepareQueryParams = () => {
    const params: LabReportQueryParams = { page: pageNumber + 1 };
    return params;
  };

  const fetchPublishedLabReports = () => {
    const params: LabReportQueryParams = prepareQueryParams();
    return labReport.fetchPublishedLabReports(params);
  };

  const { data, isFetching, isError, refetch } = useQuery(
    ['fetch-published-lab-reports', pageNumber],
    fetchPublishedLabReports,
    { refetchOnWindowFocus: false }
  );

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  return {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    handlePageChange,
  };
}
