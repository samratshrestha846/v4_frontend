import {
  DEVICE_COUNTS_BY_STOCKTYPE,
  DEVICES,
  EXPORT_DEVICE_REPORT,
  UPDATE_DEVICE_SETTINGS,
  UPDATE_DEVICE_STOCK_TYPE,
  UPDATE_DOSER_USAGES,
} from '../../constants/apiUrls';
import {
  Device,
  DeviceCountResponse,
  DeviceFormFields,
  DeviceListResponse,
  DeviceQueryParams,
  DeviceStockTypeUpdateFormFields,
} from '../../types/device/device';
import { prepareDynamicUrl } from '../helpers';

import { APICore } from './apiCore';

function apiDevice() {
  const apiCore = new APICore();

  return {
    fetchDevices: async (
      params: DeviceQueryParams
    ): Promise<DeviceListResponse> => {
      const response = await apiCore.get(DEVICES, params);
      return response.data;
    },

    createDevice: async (formData: DeviceFormFields): Promise<Device> => {
      const response = await apiCore.create(DEVICES, formData);
      return response.data.body;
    },

    getDeviceById: async (id: string | undefined): Promise<Device> => {
      const response = await apiCore.get(`${DEVICES}/${id}`);
      return response.data.body;
    },

    updateDevice: async (
      formData: DeviceFormFields,
      id: string | undefined
    ): Promise<Device> => {
      const response = await apiCore.update(`${DEVICES}/${id}`, formData);
      return response.data.body;
    },

    updateDeviceStockType: async (
      formData: DeviceStockTypeUpdateFormFields,
      id: string | undefined
    ): Promise<Device> => {
      const response = await apiCore.create(
        prepareDynamicUrl(UPDATE_DEVICE_STOCK_TYPE, id),
        formData
      );
      return response.data.body;
    },

    updateDoserUsages: async (
      formData: FormData,
      id: string | undefined
    ): Promise<Device> => {
      const response = await apiCore.update(
        prepareDynamicUrl(UPDATE_DOSER_USAGES, id),
        formData
      );
      return response.data.body;
    },

    exportDeviceReport: async (
      params: DeviceQueryParams | null
    ): Promise<Blob> => {
      const response = await apiCore.getFile(EXPORT_DEVICE_REPORT, {
        ...params,
      });
      return response.data;
    },

    clearAlarmMessages: async (
      formData: { clear_alarm: string },
      id: number | undefined
    ): Promise<any> => {
      const response = await apiCore.update(
        prepareDynamicUrl(UPDATE_DEVICE_SETTINGS, id),
        formData
      );
      return response.data;
    },

    fetchDeviceCountByStockType: async (): Promise<DeviceCountResponse> => {
      const response = await apiCore.get(DEVICE_COUNTS_BY_STOCKTYPE);
      return response.data;
    },
  };
}

export default apiDevice();
