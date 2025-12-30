import { useQuery } from '@tanstack/react-query';
import { TEMPLATE } from '../constants/constant';
import HttpApi from '../../../Http/http';
import { TemplateResponse } from '../types/Template';

export default function useReadTemplate(id?: string) {
  const apiCore = new HttpApi();
  const readTemplate = async (): Promise<TemplateResponse> => {
    const response = await apiCore.get(`${TEMPLATE}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<TemplateResponse>({
    queryKey: ['Template', id],
    queryFn: readTemplate,
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
