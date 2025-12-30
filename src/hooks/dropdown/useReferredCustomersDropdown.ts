import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useReferredCustomersDropdown() {
  const fetchReferredCustomersDropdown = async () => {
    const { body } = await apiDropdown.fetchCustomers();
    const filteredCustomers = body?.filter(
      (item: any) => item.referrer_id !== null
    );
    return filteredCustomers?.map((item: any) => ({
      value: item?.id,
      label: item?.business_name,
    }));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['referred-customers-dropdown'],
    queryFn: fetchReferredCustomersDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
