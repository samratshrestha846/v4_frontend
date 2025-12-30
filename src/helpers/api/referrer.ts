import {
  REFERRERS,
  REFERRER_KPI_CUSTOMER_COUNT,
} from '../../constants/apiUrls';

import {
  ReferrerListResponse,
  ReferrerQuery,
  Referrer,
  ReferrerFormFields,
} from '../../types/referrer/referrerList';
import { APICore } from './apiCore';
import CustomerCountKPI from '../../types/referrer/kpi';
import { prepareDynamicUrl } from '../helpers';

function apiReferrer() {
  const apiCore = new APICore();

  return {
    fetchReferrers: async (
      params: ReferrerQuery
    ): Promise<ReferrerListResponse> => {
      const response = await apiCore.get(REFERRERS, params);
      return response.data;
    },

    createReferrer: async (
      formData: ReferrerFormFields
    ): Promise<ReferrerListResponse> => {
      const response = await apiCore.createWithFile(REFERRERS, formData);
      return response.data;
    },

    getReferrerById: async (id: number): Promise<Referrer> => {
      const response = await apiCore.get(`${REFERRERS}/${id}`);
      return response.data.body;
    },

    updateReferrer: async (
      formData: ReferrerFormFields,
      id: number
    ): Promise<ReferrerListResponse> => {
      const response = await apiCore.createWithFile(
        `${REFERRERS}/${id}`,
        formData
      );
      return response.data;
    },

    getCustomersCountByReferrerId: async (
      id: number
    ): Promise<CustomerCountKPI> => {
      const url = prepareDynamicUrl(REFERRER_KPI_CUSTOMER_COUNT, id);
      const response = await apiCore.get(url);
      return response.data.body;
    },
  };
}

export default apiReferrer();
