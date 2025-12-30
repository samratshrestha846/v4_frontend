import { GeneralResponse } from '../generalResponse';

type Permission = {
  id: number;
  name: string;
  guard_anme: string;
  created_at: Date;
  updated_dat: Date;
};

interface PermissionListResponse extends GeneralResponse<Permission[]> {
  data: Permission[];
}

export type { PermissionListResponse, Permission };

export type ExplicitPermissionFormFields = {
  permission_id: number[];
  user_id: number;
};
