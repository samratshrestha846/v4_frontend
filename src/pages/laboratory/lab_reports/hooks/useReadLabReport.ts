import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import labReport from '../../../../helpers/api/labReport';

export default function useReadLabReport() {
  const { id } = useParams();

  const getLabReportById = () => {
    return labReport.getLabReportById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-lab-report', id],
    queryFn: getLabReportById,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
