import { useQuery } from '@tanstack/react-query';
import { STAFF } from '../constants/constant';
import HttpApi from '../../Http/http';
import { StaffResponse } from '../types/Staff';

export default function useReadStaff(id?: string) {
  const apiCore = new HttpApi();
  const readStaff = async (): Promise<StaffResponse> => {
    const response = await apiCore.get(`${STAFF}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<StaffResponse>({
    queryKey: ['Staff', id],
    queryFn: readStaff,
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
