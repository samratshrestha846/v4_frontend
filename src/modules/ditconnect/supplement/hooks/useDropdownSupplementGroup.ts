import { useQuery } from '@tanstack/react-query';
import HttpApi from '../../Http/http';
import { DROPDOWN_SUPPLEMENT_GROUP } from '../../constants/apiUrls';

export default function useDropdownSupplementGroup() {
  const httpApi = new HttpApi();
  const fetchData = async () => {
    const response = await httpApi.get(DROPDOWN_SUPPLEMENT_GROUP);
    return (
      response?.data?.data?.map((item: any) => ({
        value: item?.group,
        label: item?.group,
      })) || []
    );
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['fetch-dropdown-supplement-group'],
    queryFn: fetchData,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
