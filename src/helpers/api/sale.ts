import { SALES, GET_SALES_BY_REFERRER_ID } from '../../constants/apiUrls';
import {
  Sale,
  SaleFormFields,
  SaleListResponse,
  SaleQuery,
} from '../../types/sale/saleList';
import { APICore } from './apiCore';
import { prepareDynamicUrl } from '../helpers';

function apiSale() {
  const apiCore = new APICore();

  return {
    fetchSales: async (params: SaleQuery): Promise<SaleListResponse> => {
      const response = await apiCore.get(SALES, params);
      return response.data;
    },

    getSalesByReferrerId: async (
      params: SaleQuery,
      id: number
    ): Promise<SaleListResponse> => {
      const url = prepareDynamicUrl(GET_SALES_BY_REFERRER_ID, id);
      const response = await apiCore.get(url, params);
      return response.data;
    },

    createSale: async (data: SaleFormFields): Promise<Sale> => {
      const response = await apiCore.create(SALES, data);
      return response.data.body;
    },

    getSaleById: async (id: number): Promise<Sale> => {
      const response = await apiCore.get(`${SALES}/${id}`);
      return response.data.body;
    },

    updateSale: async (formData: SaleFormFields, id: number): Promise<Sale> => {
      const response = await apiCore.update(`${SALES}/${id}`, formData);
      return response.data.body;
    },
  };
}

export default apiSale();
