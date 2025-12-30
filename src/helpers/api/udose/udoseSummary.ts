import {
  UDOSE_BATTERY_SOLAR_VOLTAGE,
  UDOSE_CONDUCTIVITY,
  UDOSE_DAILY_SUMMARY,
  UDOSE_NUTRIENT_USAGE,
  UDOSE_RECORD_HOURS,
  UDOSE_RECORD_SUMMARY,
} from '../../../constants/apiUrls';
import { DurationQueryFilterParams } from '../../../types/common';
import {
  UdoseBatterySolarVoltageData,
  UdoseConductivityData,
  UdoseDailySummaryRecord,
  UdoseNutrientUsageData,
  UdoseRecordHourData,
  UdoseRecordSummary,
  UdoseSummaryFilterParams,
} from '../../../types/udose/udoseSummary';
import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiUdoseSummary() {
  const api = new APICore();

  return {
    getUdoseRecordSummary: async (
      id: string | undefined,
      params: UdoseSummaryFilterParams | null
    ): Promise<UdoseRecordSummary> => {
      const response = await api.get(
        prepareDynamicUrl(UDOSE_RECORD_SUMMARY, id),
        params
      );
      return response.data.body;
    },

    getUdoseDailySummary: async (
      id: string | undefined
    ): Promise<UdoseDailySummaryRecord[]> => {
      const response = await api.get(
        prepareDynamicUrl(UDOSE_DAILY_SUMMARY, id)
      );
      return response.data.data;
    },

    getUdoseRecordHoursById: async (
      id: number | undefined,
      params: DurationQueryFilterParams | null
    ): Promise<UdoseRecordHourData> => {
      const response = await api.get(
        prepareDynamicUrl(UDOSE_RECORD_HOURS, id),
        params
      );
      return response.data.body;
    },

    getUdoseNutrientUsageBySiteId: async (
      id: number | undefined,
      params: DurationQueryFilterParams | null
    ): Promise<UdoseNutrientUsageData> => {
      const response = await api.get(
        prepareDynamicUrl(UDOSE_NUTRIENT_USAGE, id),
        params
      );
      return response.data.body;
    },

    getUdoseBatterySolarVoltageBySiteId: async (
      id: number | undefined,
      params: DurationQueryFilterParams | null
    ): Promise<UdoseBatterySolarVoltageData> => {
      const response = await api.get(
        prepareDynamicUrl(UDOSE_BATTERY_SOLAR_VOLTAGE, id),
        params
      );
      return response.data.body;
    },

    getUdoseConductivityBySiteId: async (
      id: number | undefined,
      params: DurationQueryFilterParams | null
    ): Promise<UdoseConductivityData> => {
      const response = await api.get(
        prepareDynamicUrl(UDOSE_CONDUCTIVITY, id),
        params
      );
      return response.data.body;
    },
  };
}

export default apiUdoseSummary();
