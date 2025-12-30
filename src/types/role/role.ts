import { GeneralResponse } from '../generalResponse';
import { Permission } from '../permission/permissionList';

type Role = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_id: number;
    model_type: string;
    role_id: number;
  };
  permissions?: Permission[];
};

export default Role;

export interface RoleListResponse extends GeneralResponse<Role[]> {
  body: Role[];
}
