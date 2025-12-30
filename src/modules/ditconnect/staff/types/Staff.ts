import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { Permission } from '@uhub/types/permission/permissionList';

export type StaffResponse = {
  id: number;
  user_id: number;
  role: string;
  fcm_topic: string;
  mobile_number?: string;
  department?: string;
  position?: string;
  status: string;
  permissions: Permission[];
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    name?: string;
  };
};

export type StaffFormProps = {
  user_id: number | null;
  mobile_number: string | null | undefined;
  department: string | null | undefined;
  position: string | null | undefined;
  role: string | null | undefined;
};

export interface StaffListResponse extends GeneralResponse<StaffResponse[]> {
  data: StaffResponse[];
}

export type StaffParams = QueryParam & {
  status: string;
  role: string;
  department: string;
};

export const departments = {
  PEOPLE_AND_CULTURE: 'People and Culture',
  FINANCE: 'Finance',
  HARDWARE: 'Hardware',
  SOFTWARE: 'Software',
  MARKETING: 'Marketing',
  SALES: 'Sales',
  INNOVATION: 'Innovation',
} as const;

export const departmentOptions = Object.entries(departments).map(
  ([, value]) => ({
    label: value,
    value,
  })
);
