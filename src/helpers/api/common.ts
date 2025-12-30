import { CONFIGURATION_SETTINGS } from '../../constants/apiUrls';
import { ConfigurationSetting } from '../../types/udose/configurationSettings';

import { APICore } from './apiCore';

function apiCommon() {
  const apiCore = new APICore();

  return {
    fetchConfigurationSettings: async (): Promise<ConfigurationSetting[]> => {
      const response = await apiCore.get(CONFIGURATION_SETTINGS);
      return response.data.data;
    },
  };
}

export default apiCommon();
