import { useQuery } from '@tanstack/react-query';
import { FOLDERS } from '../../constants/constant';
import HttpApi from '../../../Http/http';
import { FolderResponse } from '../../types/Document';

export default function useReadFolder(id?: string) {
  const apiCore = new HttpApi();
  const readDocument = async () => {
    const response = await apiCore.get(`${FOLDERS}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<FolderResponse>({
    queryKey: ['Folder', id],
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
