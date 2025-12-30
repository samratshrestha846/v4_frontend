import {
  CERES_TAG_UPDATE_SETTING,
  CUSTOMER_PROPERTIES,
  CUSTOMER_SUBSCRIPTIONS,
} from '../../constants/apiUrls';
import {
  PropertyListResponse,
  PropertyDataResponse,
  PropertyFormValues,
  Property,
  CustomerSubscription,
} from '../../types/property/propertyList';
import { prepareDynamicUrl } from '../helpers';
import { APICore } from './apiCore';

function apiCustomerProperty() {
  const apiCore = new APICore();
  return {
    getCustomerProperties: async (
      params: any
    ): Promise<PropertyListResponse> => {
      const response = await apiCore.get(CUSTOMER_PROPERTIES, params);
      return response.data;
    },

    createProperty: async (formData: any): Promise<PropertyDataResponse> => {
      const response = await apiCore.create(CUSTOMER_PROPERTIES, formData);
      return response.data;
    },

    readProperty: async (id: number): Promise<Property> => {
      const response = await apiCore.get(`${CUSTOMER_PROPERTIES}/${id}`);
      return response.data.body;
    },

    updateProperty: async (
      formData: any,
      id: number
    ): Promise<PropertyDataResponse> => {
      const response = await apiCore.update(
        `${CUSTOMER_PROPERTIES}/${id}`,
        formData
      );
      return response.data;
    },

    updatePropertyAlertNotiticationsSetting: async (
      formData: PropertyFormValues,
      id: string | undefined
    ): Promise<Property> => {
      const response = await apiCore.create(
        prepareDynamicUrl(CERES_TAG_UPDATE_SETTING, id),
        formData
      );
      return response.data.data;
    },

    createCustomerSubscriptions: async (
      formData: any
    ): Promise<CustomerSubscription> => {
      const response = await apiCore.create(CUSTOMER_SUBSCRIPTIONS, formData);
      return response.data.data;
    },
  };
}

export default apiCustomerProperty();
