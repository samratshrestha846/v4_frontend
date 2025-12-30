import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useReferrersDropdown() {
  const fetchReferrersDropdown = async () => {
    const { body } = await apiDropdown.fetchReferrers();
    return body?.map((item: any) => ({
      value: item?.id,
      label: `${item?.first_name} ${item?.last_name}`,
    }));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['referrers-dropdown'],
    queryFn: fetchReferrersDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
