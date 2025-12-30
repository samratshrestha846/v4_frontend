import { GeneralResponse } from '@uhub/types/generalResponse';

type Author = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
};

export type MessageResponse = {
  id: number;
  author: Author;
  author_id: number;
  created_at: string;
  updated_at: string;
  expires_on: string;
  message: string;
  publish_date: string;
  status: string;
  type: string;
};

export type MessageFormProps = {
  type: string | null;
  message: string | null;
  publish_date: string | null | Date;
  status?: string | null;
  expires_on: string | null | Date;
};

export interface MessageListResponse
  extends GeneralResponse<MessageResponse[]> {
  data: MessageResponse[];
}
export type QueryParamMessage = {
  page: number;
  search?: string;
  status?: string;
  type?: string;
};

export type MessageParams = QueryParamMessage & {};

export const messageType = {
  CEO_MESSAGE: 'CEO Message',
  BANNER_MESSAGE: 'Banner Message',
} as const;

export const messageTypeOptions = Object.entries(messageType).map(
  ([, value]) => ({
    label: value,
    value,
  })
);
