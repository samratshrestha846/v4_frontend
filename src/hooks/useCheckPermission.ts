import { useSelector } from 'react-redux';
import initialStoreState from '@uhub/types/redux/store-type';
import { hasRoles } from '@uhub/helpers';
import Role from '@uhub/types/role/role';
import { User } from '@uhub/types/user/user';

import { ROLE_SUPER_ADMIN } from '../constants/constants';

export default function useCheckPermission() {
  const user = useSelector((state: initialStoreState) => state.Auth.user);

  const allPermissions = (userData: User) =>
    [
      ...(userData?.permissions ?? []),
      ...(userData?.roles.flatMap((role: Role) => role.permissions) ?? []),
    ].map((p) => p?.name);

  const can = (permission: string | string[]): boolean => {
    if (
      hasRoles(user) &&
      user.roles.some((item: any) => item.name === ROLE_SUPER_ADMIN)
    )
      return true; // if multiple permissions
    if (Array.isArray(permission)) {
      return permission.some((item) => allPermissions(user).includes(item));
    }
    return allPermissions(user).includes(permission);
  };

  const cannot = (permission: string): boolean => {
    if (hasRoles(user) && user.roles[0].name === ROLE_SUPER_ADMIN) return false;
    return !allPermissions(user).includes(permission);
  };

  return { can, cannot };
}
