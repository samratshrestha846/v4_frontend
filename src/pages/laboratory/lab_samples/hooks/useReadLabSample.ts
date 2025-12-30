import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import labSample from '../../../../helpers/api/labSample';
import { prepareDynamicUrl } from '../../../../helpers';
import { LAB_TEST_RESULT_ADD } from '../../../../constants/path';

export default function useReadLabSample() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getLabSampleById = () => {
    return labSample.getLabSampleById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-lab-sample', id],
    queryFn: getLabSampleById,
    refetchOnWindowFocus: false,
  });

  const navigateToAddLabTestResult = () => {
    return navigate(prepareDynamicUrl(LAB_TEST_RESULT_ADD, id));
  };

  return {
    data,
    isFetching,
    isFetched,
    isError,
    navigateToAddLabTestResult,
  };
}
