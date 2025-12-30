import { useQuery } from '@tanstack/react-query';
import { SUMMARY } from '../constants/constant';
import HttpApi from '../../../Http/http';
import { SummaryResponse } from '../types/Summary';

export default function useReadSummary(id?: string) {
  const apiCore = new HttpApi();
  const readSummary = async (): Promise<SummaryResponse> => {
    const response = await apiCore.get(`${SUMMARY}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<SummaryResponse>({
    queryKey: ['Summary', id],
    queryFn: readSummary,
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
