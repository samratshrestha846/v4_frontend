/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query';
import labSampleType from '../../../../helpers/api/labSampleType';

export default function useTestTypesDropdownBySampleTypeId(id: any) {
  const getLabSampleTypeById = async () => {
    const { test_types } = await labSampleType.getLabSampleTypeById(id);
    return test_types && test_types.length > 0
      ? test_types?.map((item: any) => ({
          value: item?.key,
          label: item?.name,
        }))
      : [];
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['test-types-dropdown-by-sample-type', id],
    queryFn: getLabSampleTypeById,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
