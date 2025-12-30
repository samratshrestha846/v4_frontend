import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { CeresTag } from '../../types/ceresTag/ceresTag';
import { LabelNumericValue } from '../../types/common';

export default function useCeresTagDropdown(customerPropertyId?: string) {
  const fetchCeresTagDropdown = async () => {
    const params: any = { page_size: 1000 };

    const { body } = await apiDropdown.fetchCeresTags(
      customerPropertyId,
      params
    );

    const dropdownData: LabelNumericValue[] = await body?.map(
      (item: CeresTag) => ({
        label: item.vid,
        value: item.id,
      })
    );

    return dropdownData;
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['ceres-tags-dropdown'],
    queryFn: fetchCeresTagDropdown,
    enabled: !!customerPropertyId,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
