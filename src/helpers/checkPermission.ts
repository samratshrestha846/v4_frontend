// @flow
import { useSelector } from 'react-redux';
import Role from '@uhub/types/role/role';
import { ROLE_SUPER_ADMIN } from '../constants/constants';

import { hasRoles } from './helpers';
import initialStoreState from '../types/redux/store-type';
import { User } from '../types/user/user';

const can = (permission: string | string[]): boolean => {
  const user = useSelector((state: initialStoreState) => state.Auth.user);

  if (
    hasRoles(user) &&
    user.roles.some((item: any) => item.name === ROLE_SUPER_ADMIN)
  )
    return true;
  // if multiple permissions
  if (Array.isArray(permission)) {
    return permission.some((item) => allPermissions(user).includes(item));
  }
  return allPermissions(user).includes(permission);
};

const cannot = (permission: string): boolean => {
  const user = useSelector((state: initialStoreState) => state.Auth.user);
  if (hasRoles(user) && user.roles[0].name === ROLE_SUPER_ADMIN) return false;
  return !allPermissions(user).includes(permission);
};

const allPermissions = (user: User) =>
  [
    ...(user?.permissions ?? []),
    ...(user.roles ?? [].flatMap((role: Role) => role?.permissions ?? [])),
  ].map((p) => p?.name);

export { can, cannot };
