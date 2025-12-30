import { PERMISSIONS_BY_ROLE, ROLES } from '../../constants/apiUrls';
import ModuleWithPermissions from '../../types/module';
import Role from '../../types/role/role';
import { prepareDynamicUrl } from '../helpers';

import { APICore } from './apiCore';

function apiRole() {
  const apiCore = new APICore();

  return {
    fetchRoles: async (): Promise<Role[]> => {
      const response = await apiCore.get(ROLES);
      return response.data.body;
    },

    fetchPermissionsByRole: async (
      id: number
    ): Promise<ModuleWithPermissions[]> => {
      const response = await apiCore.get(
        prepareDynamicUrl(PERMISSIONS_BY_ROLE, id)
      );
      return response.data.body;
    },
  };
}

export default apiRole();
