type Pagination = {
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
  from: number;
  to: number;
};

type MetaData = {
  pagination: Pagination;
};

interface GeneralResponse<T> {
  data?: T;
  status: string;
  message: string;
  meta_data?: MetaData;
  errors?: any;
}

type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};

interface GeneralResponseOld<T> {
  data?: T;
  status: string;
  message: string;
  meta?: Meta;
  errors?: any;
}

// eslint-disable-next-line import/prefer-default-export
export type { GeneralResponse, GeneralResponseOld };
