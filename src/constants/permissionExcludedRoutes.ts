import { DIT_CONNECT_DASHBOARD } from '@project/ditconnect/constants/path';
import { UNIFIED_DASHBOARD } from '../modules/dashboard/constants/path';
import {
  ACCOUNT_CHANGE_PASSWORD,
  ACCOUNT_SETTINGS,
  MAP_VIEW_DASHBOARD,
  UHUB_DASHBOARD,
  UHUB_NEW_DASHBOARD,
} from './path';
import { NEVILLE_AUTH } from '../modules/neville/constant';

// eslint-disable-next-line import/prefer-default-export
export const PERMISSION_EXCLUDED_ROUTES = [
  { pathname: UHUB_DASHBOARD },
  { pathname: UHUB_NEW_DASHBOARD },
  { pathname: ACCOUNT_CHANGE_PASSWORD },
  { pathname: MAP_VIEW_DASHBOARD },
  { pathname: ACCOUNT_SETTINGS },
  { pathname: UNIFIED_DASHBOARD },
  { pathname: DIT_CONNECT_DASHBOARD },
  { pathname: NEVILLE_AUTH },
];
