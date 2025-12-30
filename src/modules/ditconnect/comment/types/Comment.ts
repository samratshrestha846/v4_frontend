import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { User } from '@uhub/types/user/user';

export type CommentResponse = {
  id: number;
  commentable_type: string;
  commentable_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user: User;
};

export type CommentFormProps = {
  id?: number | null;
  commentable_id: number | null;
  comment: string | null;
  commentable_type: string | null;
};

export interface CommentListResponse
  extends GeneralResponse<CommentResponse[]> {
  data: CommentResponse[];
}

export type CommentParams = QueryParam & {};
