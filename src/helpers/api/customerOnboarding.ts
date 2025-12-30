import { CUSTOMERS } from '../../constants/apiUrls';
import { APICore } from './apiCore';

function apiCustomerOnboarding() {
  const apiCore = new APICore();
  return {
    createCustomerOnboarding: async (formData: any): Promise<any> => {
      const response = await apiCore.create(CUSTOMERS, formData);
      return response.data;
    },
  };
}

export default apiCustomerOnboarding();
