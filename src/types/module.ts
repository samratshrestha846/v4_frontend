type ModulePermission = {
  label: string;
  name: string;
  permission_id: number;
  role_has_permission: boolean;
};

type ModuleWithPermissions = {
  module: string;
  permissions: ModulePermission[];
};

export default ModuleWithPermissions;
