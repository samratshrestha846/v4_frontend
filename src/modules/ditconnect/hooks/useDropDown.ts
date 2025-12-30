import { useQuery } from '@tanstack/react-query';
// import fetchData from '../helpers/api';
import HttpApi from '../Http/http';

export default function useDropDown<T>(
  endpoints: string,
  transform?: any,
  params?: any
) {
  const httpApi = new HttpApi();
  const fetchData = async (): Promise<T> => {
    const data = await httpApi.get(endpoints, params);
    return transform
      ? transform(data?.data?.data)
      : data?.data.data.map((item: any) => ({
          value: item?.id,
          label: `${item?.name}`,
        }));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: [endpoints, params],
    queryFn: fetchData,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
