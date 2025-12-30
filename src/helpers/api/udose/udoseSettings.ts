import {
  UDOSE_RECORD_SETTINGS,
  UDOSE_SITE_SUPPLEMENTS,
  UPDATE_DEVICE_SETTINGS,
} from '../../../constants/apiUrls';
import UdoseRecordSettings from '../../../types/udose/udoseSettings';
import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiUdoseSettings() {
  const api = new APICore();

  return {
    getUdoseRecordSettings: async (
      id: string | undefined
    ): Promise<UdoseRecordSettings> => {
      const response = await api.get(
        prepareDynamicUrl(UDOSE_RECORD_SETTINGS, id)
      );
      return response.data.body;
    },

    updateDeviceSettings: async (
      formData: any,
      id: string | undefined
    ): Promise<any> => {
      const response = await api.update(
        prepareDynamicUrl(UPDATE_DEVICE_SETTINGS, id),
        formData
      );
      return response.data.body;
    },

    fetchUdoseSiteSupplements: async (id: number): Promise<any> => {
      const response = await api.get(
        prepareDynamicUrl(UDOSE_SITE_SUPPLEMENTS, id)
      );
      return response.data.body;
    },
  };
}

export default apiUdoseSettings();
