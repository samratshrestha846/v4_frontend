import {
  PERMISSIONS,
  USER_EXPLICIT_PERMISSIONS,
} from '../../constants/apiUrls';
import { APICore } from './apiCore';
import {
  ExplicitPermissionFormFields,
  Permission,
} from '../../types/permission/permissionList';

function permission() {
  const apiCore = new APICore();

  return {
    fetchPermissions: async (): Promise<Permission[]> => {
      const response = await apiCore.get(PERMISSIONS);
      return response.data.body;
    },

    assignExplicitPermissions: async (
      formData: ExplicitPermissionFormFields
    ): Promise<Permission> => {
      const response = await apiCore.create(
        USER_EXPLICIT_PERMISSIONS,
        formData
      );
      return response.data.data;
    },
  };
}

export default permission();
