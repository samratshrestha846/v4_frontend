import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import labTestResult from '../../../../helpers/api/labTestResult';

export default function useReadLabTestResult() {
  const { id } = useParams();

  const getLabRestResultById = () => {
    return labTestResult.getLabRestResultById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-lab-test-result', id],
    queryFn: getLabRestResultById,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
