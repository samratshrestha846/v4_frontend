import { CUSTOMERS, CUSTOMERS_BY_REFERRER_ID } from '../../constants/apiUrls';
import {
  CustomerListResponse,
  Customer,
} from '../../types/customer/customerList';
import { APICore } from './apiCore';
import { prepareDynamicUrl } from '../helpers';
import { CustomerInputFields } from '../../types/customer/customerOnboarding';

function apiCustomer() {
  const apiCore = new APICore();
  return {
    getCustomers: async (params: any): Promise<CustomerListResponse> => {
      const response = await apiCore.get(CUSTOMERS, params);
      return response.data;
    },

    createCustomer: async (
      formData: CustomerInputFields
    ): Promise<CustomerListResponse> => {
      const response = await apiCore.create(CUSTOMERS, formData);
      return response.data;
    },

    getCustomerById: async (id: number): Promise<Customer> => {
      const response = await apiCore.get(`${CUSTOMERS}/${id}`);
      return response.data.body;
    },

    updateCustomer: async (
      formData: CustomerInputFields,
      id: number
    ): Promise<CustomerListResponse> => {
      const response = await apiCore.update(`${CUSTOMERS}/${id}`, formData);
      return response.data;
    },

    getCustomersByReferrerId: async (
      params: any,
      id: number
    ): Promise<CustomerListResponse> => {
      const url = prepareDynamicUrl(CUSTOMERS_BY_REFERRER_ID, id);
      const response = await apiCore.get(url, params);
      return response.data;
    },
  };
}

export default apiCustomer();
