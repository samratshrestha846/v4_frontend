import { useQuery } from '@tanstack/react-query';
import { LAB_SAMPLE } from '../constants/constant';
import HttpApi from '../../Http/http';
import { LabSampleResponse } from '../types/LabSample';

export default function useReadLabSample(id?: string) {
  const apiCore = new HttpApi();
  const readLabSample = async (): Promise<LabSampleResponse> => {
    const response = await apiCore.get(`${LAB_SAMPLE}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<LabSampleResponse>({
    queryKey: ['LabSample', id],
    queryFn: readLabSample,
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
