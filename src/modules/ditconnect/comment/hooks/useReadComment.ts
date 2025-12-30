import { useQuery } from '@tanstack/react-query';
import { COMMENT } from '../constants/constant';
import HttpApi from '../../Http/http';
import { CommentResponse } from '../types/Comment';

export default function useReadComment(id?: string) {
  const apiCore = new HttpApi();
  const readComment = async (): Promise<CommentResponse> => {
    const response = await apiCore.get(`${COMMENT}/${id}`);
    return response.data.data;
  };
  const { data, isFetching, isFetched, isError } = useQuery<CommentResponse>({
    queryKey: ['Comment', id],
    queryFn: readComment,
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
