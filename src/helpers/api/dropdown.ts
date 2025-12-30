import {
  CREDIT_TYPES,
  DROPDOWN_CUSTOMERS,
  DROPDOWN_PROPERTIES,
  DROPDOWN_REFERRERS,
  DROPDOWN_UDOSE_SITES,
  REGIONS,
  USERS,
  DEVICE_CONFIGURATIONS,
  STOCK_TYPES,
  TAGS,
  DROPDOWN_LAB_SAMPLE_TYPES,
  DROPDOWN_DEVICES,
  DROPDOWN_LAB_SAMPLES,
  CERESTAGS_BY_CUSTOMER_PROPERT_ID,
  CROPS,
  DROPDOWN_PRODUCTS,
  PADDOCKS,
  BLOCKS_BY_PADDOCK,
  SUB_BLOCKS_BY_BLOCK,
  FERTILIZERS,
  DIT_USERS,
  DROPDOWN_SUPPLEMENTS,
  DROPDOWN_TAG_TYPES,
  ROLES,
  USERS_DROPDOWN,
} from '../../constants/apiUrls';
import { DeviceDropdownQueryParams } from '../../types/device/device';
import { Block } from '../../types/horticulture/block';
import { Fertilizer } from '../../types/horticulture/fertilizer';
import { Paddock } from '../../types/horticulture/paddock';
import { SubBlock } from '../../types/horticulture/subBlock';
import { LabSampleListResponse } from '../../types/lab/labSampleList';
import { PropertyDropdownQueryParams } from '../../types/property/propertyList';
import { RoleListResponse } from '../../types/role/role';
import { Supplement } from '../../types/supplements/supplement';
import {
  UdoseDropdownQueryParams,
  UdoseDropdownResponse,
} from '../../types/udose/udoseDropdown';
import { prepareDynamicUrl } from '../helpers';
import { APICore } from './apiCore';

function apiDropdown() {
  const apiCore = new APICore();
  return {
    fetchRegions: async (): Promise<any> => {
      const response = await apiCore.get(REGIONS);
      return response.data;
    },

    fetchCustomers: async (): Promise<any> => {
      const response = await apiCore.get(DROPDOWN_CUSTOMERS);
      return response.data;
    },

    fetchUsers: async (params: any): Promise<any> => {
      const response = await apiCore.get(USERS, params);
      return response.data;
    },

    fetchReferrers: async (): Promise<any> => {
      const response = await apiCore.get(DROPDOWN_REFERRERS);
      return response.data;
    },

    fetchProperties: async (
      params: PropertyDropdownQueryParams
    ): Promise<any> => {
      const response = await apiCore.get(DROPDOWN_PROPERTIES, params);
      return response.data;
    },

    fetchUdoseSites: async (
      params: UdoseDropdownQueryParams
    ): Promise<UdoseDropdownResponse> => {
      const response = await apiCore.get(DROPDOWN_UDOSE_SITES, params);
      return response.data;
    },

    fetchLabSampleTypes: async (): Promise<any> => {
      const response = await apiCore.get(DROPDOWN_LAB_SAMPLE_TYPES);
      return response.data;
    },

    getUsersByRole: async (params: any): Promise<any> => {
      const response = await apiCore.get(USERS, params);
      return response.data;
    },

    getUsersByPlatform: async (params: any): Promise<any> => {
      const response = await apiCore.get(USERS_DROPDOWN, params);
      return response.data;
    },

    fetchCreditTypes: async (): Promise<any> => {
      const response = await apiCore.get(CREDIT_TYPES);
      return response.data;
    },

    fetchDeviceConfigurations: async (): Promise<any> => {
      const response = await apiCore.get(DEVICE_CONFIGURATIONS);
      return response.data;
    },

    fetchStockTypes: async (): Promise<any> => {
      const response = await apiCore.get(STOCK_TYPES);
      return response.data;
    },

    fetchTags: async (): Promise<any> => {
      const response = await apiCore.get(TAGS);
      return response.data;
    },

    fetchDevices: async (params: DeviceDropdownQueryParams): Promise<any> => {
      const response = await apiCore.get(DROPDOWN_DEVICES, params);
      return response.data;
    },

    fetchLabSamplesDropdown: async (
      params: any
    ): Promise<LabSampleListResponse> => {
      const response = await apiCore.get(DROPDOWN_LAB_SAMPLES, params);
      return response.data;
    },

    fetchCeresTags: async (id?: string, params?: any): Promise<any> => {
      const response = await apiCore.get(
        prepareDynamicUrl(CERESTAGS_BY_CUSTOMER_PROPERT_ID, id),
        params
      );
      return response.data;
    },

    fetchCrops: async (params?: any): Promise<any> => {
      const response = await apiCore.get(CROPS, params);
      return response.data;
    },

    fetchProducts: async (): Promise<any> => {
      const response = await apiCore.get(DROPDOWN_PRODUCTS);
      return response.data;
    },

    fetchPaddocks: async (params?: any): Promise<Paddock[]> => {
      const response = await apiCore.get(PADDOCKS, params);
      return response.data.body;
    },

    fetchBlocks: async (id?: number): Promise<Block[]> => {
      const response = await apiCore.get(
        prepareDynamicUrl(BLOCKS_BY_PADDOCK, id)
      );
      return response.data.body;
    },

    fetchSubBlocks: async (id?: number): Promise<SubBlock[]> => {
      const response = await apiCore.get(
        prepareDynamicUrl(SUB_BLOCKS_BY_BLOCK, id)
      );
      return response.data.body;
    },

    fetchFertilizers: async (): Promise<Fertilizer[]> => {
      const response = await apiCore.get(FERTILIZERS);
      return response.data.body;
    },

    fetchDitUsers: async (): Promise<any[]> => {
      const response = await apiCore.get(DIT_USERS);
      return response.data.body;
    },

    fetchSupplementsDropdown: async (): Promise<Supplement[]> => {
      const response = await apiCore.get(DROPDOWN_SUPPLEMENTS);
      return response.data.body;
    },

    fetchTagTypesDropdown: async (): Promise<string[]> => {
      const response = await apiCore.get(DROPDOWN_TAG_TYPES);
      return response.data;
    },

    fetchRoles: async (): Promise<RoleListResponse> => {
      const response = await apiCore.get(ROLES);
      return response.data;
    },
  };
}

export default apiDropdown();
