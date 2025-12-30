/* eslint-disable default-param-last */
import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { PropertyDropdownQueryParams } from '../../types/property/propertyList';

export default function usePropertiesDropdown(
  queryEnabled = true,
  customerId?: number
) {
  const fetchPropertiesDropdown = async () => {
    const params: PropertyDropdownQueryParams = {};

    if (customerId) {
      params.customer_id = customerId;
    }

    const { body } = await apiDropdown.fetchProperties(params);
    return (
      body?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
        customer_id: item?.customer_id,
        customer: item?.customer?.business_name,
        region: item?.region?.name,
      })) ?? []
    );
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['customer-properties-dropdown ', customerId],
    queryFn: fetchPropertiesDropdown,
    enabled: queryEnabled,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
