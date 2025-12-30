import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type ResponseSetResponse = {
  id: number;
  name: string;
  type: string;
  items: string[];
  created_at: string;
  updated_at: string;
};

export type ResponseSetFormProps = {
  name: string | null;
  type: string | null;
  items: string[];
};

export interface ResponseSetListResponse
  extends GeneralResponse<ResponseSetResponse[]> {
  data: ResponseSetResponse[];
}

export type ResponseSetParams = QueryParam & {};

export const responseSetType = {
  QUESTION: 'Question',
  LIST: 'List',
} as const;

export const responseSetTypeOptions = Object.entries(responseSetType).map(
  ([, value]) => ({
    label: value,
    value,
  })
);
