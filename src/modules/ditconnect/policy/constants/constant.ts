import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const POLICY_LIST = `${DIT_CONNECT}/policy/list`;
export const POLICY_ADD = `${DIT_CONNECT}/policy/add`;
export const POLICY_EDIT = `${DIT_CONNECT}/policy/edit/:id`;
export const POLICY_VIEW = `${DIT_CONNECT}/policy/view/:id`;

/** /////// End PATHS //////// */
export const POLICY = '/v2/policies';
export const SHOW_POLICY = '/v2/policies/:id';
export const POLICY_NOTIFICATIONS = '/v2/policies/:id/notifications';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_POLICY: string = 'access_policy';
export const CREATE_POLICY: string = 'create_policy';
export const UPDATE_POLICY: string = 'update_policy';
export const READ_POLICY: string = 'read_policy';
export const NOTIFY_POLICY: string = 'notify_policy';
