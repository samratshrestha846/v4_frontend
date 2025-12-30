import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import labTestResult from '../../../../helpers/api/labTestResult';

export default function useTestParamsByLabSampleType(id: any) {
  const [testType, setTestType] = useState<string>();

  const getLabTestParamsByLabSampleTypeId = () => {
    const params: any = { lab_sample_type_id: id };
    if (testType) {
      params.test_type = testType;
    }
    return labTestResult.getLabTestParamsByLabSampleTypeId(params);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['lab-test-params-by-lab-sample-type', id, testType],
    queryFn: getLabTestParamsByLabSampleTypeId,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    testType,
    setTestType,
  };
}
