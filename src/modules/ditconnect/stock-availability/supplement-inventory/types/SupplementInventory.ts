import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type SupplementInventoryResponse = {
  id: number;
  supplement_id: number;
  location_id: number;
  supplement_manufacture_id: number;
  current_qty: number;
  batch_number: string;
  supplement_name: string;
  location_name: string;
  supplement_manufacture: {
    id: number;
    batch_number: string;
  };
};

export type SupplementInventoryTransactionResponse = {
  id: number;
  supplement_name: string;
  qty: number;
  supplement_inventory_id: number;
  stock_location: string;
  to_location: string;
  date: string;
  action_id: number;
  action_type: string;
  notes: string;
};

export type SupplementInventoryAdjustmentFormProps = {
  adj_qty: number | null;
  dates: string | Date | null;
  notes: string | null;
};

export interface SupplementInventoryListResponse
  extends GeneralResponse<SupplementInventoryResponse[]> {
  data: SupplementInventoryResponse[];
}

export type SupplementInventoryParams = QueryParam & {
  supplement_id?: number | null;
  location_id?: number | null;
};

export type SupplementInventoryViewResponse = {
  id: number;
  supplement_id: number;
  location_id: number;
  supplement_manufacture_id: number;
  current_qty: number;
  batch_number: string;
  supplement_name: string;
  location_name: string;
  created_at: string;
  supplement_manufacture: {
    id: number;
    batch_number: string;
  };
  transactions: SupplementInventoryTransactionResponse[];
};

export type SupplementInventoryTransactionParams = QueryParam & {};

export interface SupplementInventoryTransactionListResponse
  extends GeneralResponse<SupplementInventoryTransactionResponse[]> {
  data: SupplementInventoryTransactionResponse[];
}
