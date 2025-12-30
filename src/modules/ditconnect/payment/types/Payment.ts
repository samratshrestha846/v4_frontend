export type PaymentResponse = {
  id: number;
  paid_by: string;
  po_number: string;
  purchase_request_id: number;
  created_at: string;
  updated_at: string;
};

export type PaymentFormProps = {
  purchase_request_id: null | number;
  paid_by: null | string;
  po_number: null | string;
};
