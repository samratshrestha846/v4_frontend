import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import {
  UdoseDropdown,
  UdoseDropdownQueryParams,
} from '../../types/udose/udoseDropdown';
import { LabelNumericValue } from '../../types/common';

export default function useUdoseSitesDropdown(customerPropertyId?: number) {
  const fetchUdoseSitesDropdown = async (): Promise<LabelNumericValue[]> => {
    const params: UdoseDropdownQueryParams = {};
    if (customerPropertyId) {
      params.customer_property_id = customerPropertyId;
    }
    const { body } = await apiDropdown.fetchUdoseSites(params);
    return (
      body?.map((item: UdoseDropdown) => ({
        value: item?.id,
        label: item?.name,
      })) ?? []
    );
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['udose-sites-dropdown', customerPropertyId],
    queryFn: fetchUdoseSitesDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
