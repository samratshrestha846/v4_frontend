import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const STAFF_LIST = `${DIT_CONNECT}/staff/list`;
export const STAFF_EDIT = `${DIT_CONNECT}/staff/edit/:id`;
export const STAFF_VIEW = `${DIT_CONNECT}/staff/view/:id`;

/** /////// End PATHS //////// */
export const STAFF = '/v2/staffs';
export const ASSIGN_EXPLICIT_PERMISSION = '/v2/users/:id/permissions';
/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_STAFF: string = 'access_user';
export const UPDATE_STAFF: string = 'update_user';
export const READ_STAFF: string = 'read_user';
