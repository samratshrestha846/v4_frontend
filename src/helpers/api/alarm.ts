import { APICore } from './apiCore';
import {
  AlarmFormValues,
  Alarm,
  alarmQueryParams,
  ListAlarmResponse,
} from '../../types/alarm/alarm';
import { ALARM_TYPES, ALARM_TYPES_BY_ID } from '../../constants/apiUrls';
import { prepareDynamicUrl } from '../helpers';

function apiAlarm() {
  const apiCore = new APICore();

  return {
    getAlarmList: async (
      params: alarmQueryParams
    ): Promise<ListAlarmResponse> => {
      const response = await apiCore.get(ALARM_TYPES, params);
      return response.data;
    },

    readAlarmById: async (id?: number): Promise<Alarm> => {
      const response = await apiCore.get(
        prepareDynamicUrl(ALARM_TYPES_BY_ID, id)
      );
      return response.data.body;
    },

    addAlarm: async (formData: AlarmFormValues): Promise<Alarm> => {
      const response = await apiCore.create(ALARM_TYPES, formData);
      return response.data.body;
    },

    updateAlarm: async (
      id: number,
      formData: AlarmFormValues
    ): Promise<Alarm> => {
      const response = await apiCore.update(
        prepareDynamicUrl(ALARM_TYPES_BY_ID, id),
        formData
      );
      return response.data.body;
    },
  };
}

export default apiAlarm();
