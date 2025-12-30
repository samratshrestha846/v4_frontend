import { useQuery } from '@tanstack/react-query';
import { prepareDynamicUrl } from '@uhub/helpers';
import { SHOW_POLICY } from '../constants/constant';
import HttpApi from '../../Http/http';
import { PolicyResponse } from '../types/Policy';

export default function useReadPolicy(id?: string) {
  const apiCore = new HttpApi();
  const readPolicy = async () => {
    const response = await apiCore.get(prepareDynamicUrl(SHOW_POLICY, id));
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<PolicyResponse>({
    queryKey: ['Policy', id],
    queryFn: readPolicy,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
