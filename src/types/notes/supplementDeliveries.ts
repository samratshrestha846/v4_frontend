import { GeneralResponse } from '../generalResponse';
import { Property } from '../property/propertyList';
import { Site } from '../site';
import { Supplement } from '../supplements/supplement';
import { DitUser } from '../user/user';

export type SupplementDelivery = {
  id: number;
  supplement_id: number;
  supplement: Supplement;
  qty: number;
  stock_location: number;
  to_location?: string;
  site_id: number;
  created_by: string;
  updated_by?: string;
  date: string;
  customer_notes: null;
  storage_tank_id: null;
  storage_tank: null;
  site: Site;
  customer_property: Property;
  admin_notes: string;
  performer: DitUser;
  attachments?: [];
};

export type SupplementDeliveryQueryParams = {
  page: number;
  page_size?: number;
  date_from?: string;
  date_to?: string;
  performer_id?: number;
  customer_property_id?: number;
  sort?: string;
  direction?: string;
};

export interface ListSupplementDeliveryNotesResponse
  extends GeneralResponse<SupplementDelivery> {
  body: SupplementDelivery[];
}
