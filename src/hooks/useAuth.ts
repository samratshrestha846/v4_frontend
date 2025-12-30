import { useSelector } from 'react-redux';
import {
  ROLE_SUPER_ADMIN,
  ROLE_MANAGER,
  ROLE_STATION_MANAGER,
  ROLE_ADMIN,
  ROLE_CUSTOMER,
} from '../constants/constants';
import { APICore } from '../helpers/api/apiCore';
import { hasRoles } from '../helpers/helpers';
import initialStoreState from '../types/redux/store-type';

const useAuth = () => {
  const api = new APICore();
  const user = useSelector((state: initialStoreState) => state.Auth.user);

  let isSuperAdmin = false;
  let isManager = false;
  let isAdmin = false;
  let isCustomer = false;
  let isStationManager = false;

  if (user?.role) {
    localStorage.removeItem('dit_auth_user');
  }

  if (api.isUserAuthenticated() && hasRoles(user)) {
    isSuperAdmin = user.roles[0].name === ROLE_SUPER_ADMIN;
    isAdmin = user.roles[0].name === ROLE_ADMIN;
    isManager = user.roles[0].name === ROLE_MANAGER;
    isCustomer = user.roles[0].name === ROLE_CUSTOMER;
    isStationManager = user.roles[0].name === ROLE_STATION_MANAGER;
  }

  return {
    isSuperAdmin,
    isAdmin,
    isManager,
    isCustomer,
    isStationManager,
  };
};

export default useAuth;
