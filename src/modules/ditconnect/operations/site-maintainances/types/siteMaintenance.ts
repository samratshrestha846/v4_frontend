import { GeneralResponse } from '@uhub/types/generalResponse';
import { IUser } from '../../../types/ditConnect';

export type SiteMaintenanceResponse = {
  id: number;
  site_name: string;
  customer_property_name: string;
  device_serial_number: string;
  customer_notes: string;
  admin_notes: string;
  created_by: IUser;
  date: string;
};
export type SiteMaintenanceFormProps = {
  date: string | Date;
  site_id: number | null;
  device_id: number | null;
  customer_notes: string | null;
  admin_notes: string | null;
  attachments?: File[] | null;
  attachmentResponses?: any[] | null;
};
export interface SiteMaintenanceListResponse
  extends GeneralResponse<SiteMaintenanceResponse[]> {
  data: SiteMaintenanceResponse[];
}
