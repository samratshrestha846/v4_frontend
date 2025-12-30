import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type SupplierResponse = {
  id: number;
  name: string;
  phone: string;
  email: string;
  website: string;
  location: string;
};

export type SupplierFormProps = {
  name: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  location: string | null;
};

export interface SupplierListResponse
  extends GeneralResponse<SupplierResponse[]> {
  data: SupplierResponse[];
}

export type SupplierParams = QueryParam & {};
