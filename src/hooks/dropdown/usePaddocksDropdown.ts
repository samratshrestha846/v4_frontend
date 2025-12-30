import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { LabelNumericValue } from '../../types/common';

export default function usePaddocksDropdown(
  customerPropertyId?: number,
  isDependentQuery = false
) {
  const fetchPaddocksDropdown = async () => {
    const params: any = { page_size: 1000 };

    if (customerPropertyId) {
      params.customer_property_id = customerPropertyId;
    }

    const data = await apiDropdown.fetchPaddocks(params);

    const dropdownData: LabelNumericValue[] = data?.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    return dropdownData;
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['paddocks-dropdown', customerPropertyId],
    queryFn: fetchPaddocksDropdown,
    enabled: isDependentQuery ? !!customerPropertyId : true,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
