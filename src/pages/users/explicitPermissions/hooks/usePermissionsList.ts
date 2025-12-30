import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import permission from '../../../../helpers/api/permission';
import { Permission } from '../../../../types/permission/permissionList';
import { User } from '../../../../types/user/user';
import role from '../../../../helpers/api/role';
import ModuleWithPermissions from '../../../../types/module';

const usePermissionsList = (user: User | undefined) => {
  const [permissions, setPermissions] = useState<
    ModuleWithPermissions[] | undefined
  >([]);

  const fetchPermissions = () => {
    return user?.roles?.[0]?.id
      ? role.fetchPermissionsByRole(user.roles[0].id)
      : null;
  };

  const { data, isFetching, isFetched, isError } = useQuery(
    ['permissions-list'],
    fetchPermissions,
    {
      refetchOnWindowFocus: false,
    }
  );

  const grantedPermissionsList = () => {
    return user?.permissions?.map((perm: Permission) => perm.id) ?? [];
  };

  const formatPermission = (permissionText: string) => {
    const splittedData = permissionText.split('_');
    return splittedData.join(' ');
  };

  useEffect(() => {
    if (isFetched) {
      filterPermissionList();
    }
  }, [isFetched]);

  const filterPermissionList = () => {
    const rolePermissions = user?.roles
      .flatMap((item) => item.permissions)
      .map((perm) => perm?.name);

    const filteredPermissions = data?.filter(
      (element) => !rolePermissions?.includes(element.module)
    );

    setPermissions(filteredPermissions);
  };

  return {
    permissions,
    isFetching,
    isError,
    grantedPermissionsList,
    formatPermission,
  };
};

export default usePermissionsList;
