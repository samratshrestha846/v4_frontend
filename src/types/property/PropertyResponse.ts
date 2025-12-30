interface PropertyResponse<T> {
  data?: T;
  status: string;
  message: string;
  meta?: MetaData;
  errors?: any;
}

type MetaData = {
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
  from: number;
  to: number;
};

export type { PropertyResponse };
