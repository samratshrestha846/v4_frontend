import { GeneralResponse } from '../generalResponse';

type UdoseDropdownQueryParams = {
  customer_property_id?: number;
};

type UdoseDropdown = {
  id: number;
  name: string;
  site_number: string;
  is_alarmed: boolean;
  is_running: boolean;
  communicated_at: string;
};

interface UdoseDropdownResponse extends GeneralResponse<UdoseDropdown[]> {
  body: UdoseDropdown[];
}

export type { UdoseDropdown, UdoseDropdownQueryParams, UdoseDropdownResponse };
