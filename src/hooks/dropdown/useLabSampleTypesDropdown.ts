import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useLabSampleTypesDropdown() {
  const fetchLabSampleTypesDropdown = async () => {
    const { body } = await apiDropdown.fetchLabSampleTypes();
    return (
      body?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      })) ?? []
    );
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['lab-sample-types-dropdown '],
    queryFn: fetchLabSampleTypesDropdown,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
