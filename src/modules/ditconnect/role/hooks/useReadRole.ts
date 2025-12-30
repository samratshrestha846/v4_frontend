import { useQuery } from '@tanstack/react-query';
import { ROLE } from '../constants/constant';
import HttpApi from '../../Http/http';
import { RoleResponse } from '../types/Role';

export default function useReadRole(id?: string) {
  const apiCore = new HttpApi();
  const readRole = async (): Promise<RoleResponse> => {
    const response = await apiCore.get(`${ROLE}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<RoleResponse>({
    queryKey: ['Role', id],
    queryFn: readRole,
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
