import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useCustomersDropdown() {
  const fetchCustomersDropdown = async () => {
    const { body } = await apiDropdown.fetchCustomers();
    return body?.map((item: any) => ({
      value: item?.id,
      label: item?.business_name,
    }));
  };

  const {
    data: customersDropdown,
    isFetching: isFetchingCustomersDropdown,
    isFetched: isFetchedCustomersDropdown,
    isError: isErrorCustomersDropdown,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['customers-dropdown '],
    queryFn: fetchCustomersDropdown,
  });

  return {
    customersDropdown,
    isFetchingCustomersDropdown,
    isFetchedCustomersDropdown,
    isErrorCustomersDropdown,
  };
}
