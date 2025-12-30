import { ACCOUNT_SETTINGS, LOGOUT, UDOSE_TEST_SITES } from './path';
import { ACCESS_UDOSE } from './permissions';

export const ADMIN_PROFILE_MENU = [
  {
    label: 'Settings',
    icon: 'bx bx-cog',
    redirectTo: ACCOUNT_SETTINGS,
  },
  {
    label: 'Sandbox',
    icon: 'bx bx-cabinet',
    redirectTo: UDOSE_TEST_SITES,
    permission: ACCESS_UDOSE,
  },
  {
    label: 'Sign Out',
    icon: 'bx bx-log-out-circle',
    redirectTo: LOGOUT,
  },
];

export const CUSTOMER_PROFILE_MENU = [
  {
    label: 'Settings',
    icon: 'bx bx-cog',
    redirectTo: ACCOUNT_SETTINGS,
  },
  {
    label: 'Logout',
    icon: 'bx bx-log-out-circle',
    redirectTo: LOGOUT,
  },
];
