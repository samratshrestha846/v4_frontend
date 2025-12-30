import { GeneralResponse } from '../generalResponse';
import { DitUser } from '../user/user';

export type MaintenanceNotesQueryParams = {
  page: number;
  page_size: number;
  sort?: string;
  direction?: string;
  date_from?: string;
  date_to?: string;
  customer_property_id?: number;
  device_serial_number?: number;
  performer_id?: number;
};

export type NoteAttachment = {
  id: number;
  file_path: string;
  attachmentable_id: number;
  attachmentable_type: string;
  created_at: string;
  updated_at: string;
  file_url: string;
};

export type MaintenanceNote = {
  id: number;
  site_id: number;
  site_name: string;
  device_id: number;
  device_serial_number: string;
  customer_property_id: number;
  customer_property_name: string;
  date: string;
  customer_notes: string | null;
  admin_notes: string | null;
  attachments: NoteAttachment[];
  performer: DitUser;
  created_by_id?: number | null;
};

export interface MaintenanceNoteListResponse
  extends GeneralResponse<MaintenanceNote[]> {
  body: MaintenanceNote[];
}
