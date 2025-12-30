import { GeneralResponseOld } from './generalResponse';

export type Tag = {
  id: number;
  name: string;
  type: string;
};

export type TagQueryParams = {
  page: number;
  search?: string;
  type?: string;
};

export type TagFormfields = {
  type: string;
  name: string;
};

export interface TagResponse extends GeneralResponseOld<Tag[]> {
  data: Tag[];
}
