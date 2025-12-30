import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import labReport from '../../../helpers/api/labReport';
import { useNotificationContext } from '../../../context/useNotificationContext';

export default function useLabResultDetail() {
  const { id } = useParams();

  const { fetchNotificationCount } = useNotificationContext();

  const fetchPublishedLabReportDetail = () => {
    return labReport.fetchPublishedLabReportDetail(id);
  };

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryFn: fetchPublishedLabReportDetail,
    queryKey: ['published-lab-report-detail', id],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && !data?.read_at) {
      fetchNotificationCount();
    }
  }, [isSuccess]);

  return {
    data,
    isFetching,
    isError,
  };
}
