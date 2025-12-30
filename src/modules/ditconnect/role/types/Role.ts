import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type Permission = {
  id: number;
  name: string;
  guard_name: string;
  module_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    role_id: number;
    permission_id: number;
  };
};

export type RoleResponse = {
  id: number;
  name: string;
  guard_name: string;
  permissions: Permission[];
};

export type RoleFormProps = {
  name: string | null;
  permissions: Permission[];
  guard_name?: string;
};

export interface RoleListResponse extends GeneralResponse<RoleResponse[]> {
  data: RoleResponse[];
}

export type RoleParams = QueryParam & {};
