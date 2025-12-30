import { PAYMENTS, GET_PAYMENTS_BY_REFERRER_ID } from '../../constants/apiUrls';
import { APICore } from './apiCore';
import {
  Payment,
  PaymentFormFields,
  PaymentListResponse,
  PaymentQuery,
} from '../../types/payment/paymentList';
import { prepareDynamicUrl } from '../helpers';

function apiPayment() {
  const apiCore = new APICore();

  return {
    fetchPayments: async (
      params: PaymentQuery
    ): Promise<PaymentListResponse> => {
      const response = await apiCore.get(PAYMENTS, params);
      return response.data;
    },

    getPaymentsByReferrerId: async (
      params: PaymentQuery,
      id: number
    ): Promise<PaymentListResponse> => {
      const url = prepareDynamicUrl(GET_PAYMENTS_BY_REFERRER_ID, id);
      const response = await apiCore.get(url, params);
      return response.data;
    },

    createPayment: async (formData: PaymentFormFields): Promise<Payment> => {
      const response = await apiCore.create(PAYMENTS, formData);
      return response.data.data;
    },

    getPaymentById: async (id: number): Promise<Payment> => {
      const response = await apiCore.get(`${PAYMENTS}/${id}`);
      return response.data.body;
    },

    updatePayment: async (
      formData: PaymentFormFields,
      id: number
    ): Promise<Payment> => {
      const response = await apiCore.update(`${PAYMENTS}/${id}`, formData);
      return response.data.data;
    },

    deletePaymentById: async (id: number): Promise<null> => {
      const response = await apiCore.delete(`${PAYMENTS}/${id}`);
      return response.data;
    },
  };
}

export default apiPayment();
