import { StatusUpdatedBy } from '../common';

export type StockType = {
  stock_type_name: string;
  remarks?: string;
  created_at?: string;
  status_updated_by?: StatusUpdatedBy;
};
