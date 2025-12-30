import { useQuery } from '@tanstack/react-query';
import { FILES } from '../../constants/constant';
import HttpApi from '../../../Http/http';
import { FileResponse } from '../../types/Document';

export default function useReadFile(id?: string) {
  const apiCore = new HttpApi();
  const readDocument = async () => {
    const response = await apiCore.get(`${FILES}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<FileResponse>({
    queryKey: ['File', id],
    queryFn: readDocument,
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
