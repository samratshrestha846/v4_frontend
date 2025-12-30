import { useQuery } from '@tanstack/react-query';
import labTestResult from '../../../../helpers/api/labTestResult';

export default function useLabTestResultByLabSampleId(
  sampleId: string | undefined
) {
  const getLabTestResultByLabSampleById = async () => {
    return labTestResult.getLabTestResultByLabSampleById(sampleId);
  };

  const { data, isFetching, isFetched, refetch, isError, isSuccess } = useQuery(
    {
      queryKey: ['lab-test-result-by-lab-sample-id', sampleId],
      queryFn: getLabTestResultByLabSampleById,
      refetchOnWindowFocus: false,
      enabled: !!sampleId,
    }
  );

  return {
    data,
    isFetching,
    isFetched,
    refetch,
    isError,
    isSuccess,
  };
}
