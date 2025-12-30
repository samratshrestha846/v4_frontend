import { APICore } from '../apiCore';
import { DEVICE_MAINTENANCE_NOTES } from '../../../constants/apiUrls';
import {
  MaintenanceNote,
  MaintenanceNoteListResponse,
  MaintenanceNotesQueryParams,
} from '../../../types/notes/maintenance';

function apiMaintenanceNotes() {
  const apiCore = new APICore();

  return {
    fetchMaintenanceNotes: async (
      params: MaintenanceNotesQueryParams
    ): Promise<MaintenanceNoteListResponse> => {
      const response = await apiCore.get(DEVICE_MAINTENANCE_NOTES, params);
      return response.data;
    },
    getMaintenanceNoteById: async (
      id: number | undefined
    ): Promise<MaintenanceNote> => {
      const response = await apiCore.get(`${DEVICE_MAINTENANCE_NOTES}/${id}`);
      return response.data.body;
    },
  };
}

export default apiMaintenanceNotes();
