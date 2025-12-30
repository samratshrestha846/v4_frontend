import { GeneralResponse } from '../generalResponse';
import { Referrer } from '../referrer/referrerList';

type Payment = {
  id: number;
  referrer_id: number;
  amount: number;
  note: string;
  payment_date: string | Date | undefined;
  referrer: Referrer;
};

type PaymentQuery = {
  page: number;
};

interface PaymentListResponse extends GeneralResponse<Payment[]> {
  body: Payment[];
}

export type { PaymentListResponse, PaymentQuery, Payment };

export type PaymentFormFields = {
  referrer_id: number;
  amount: number;
  note: string;
  payment_date: string | Date | undefined;
};
