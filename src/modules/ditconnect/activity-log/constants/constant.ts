import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const ACTIVITY_LOG_LIST = `${DIT_CONNECT}/activity-log/list`;
export const ACTIVITY_LOG_VIEW = `${DIT_CONNECT}/activity-log/view/:id`;

/** /////// End PATHS //////// */
export const ACTIVITY_LOG = '/v2/activity-logs';
export const ACTIVITY_LOG_SHOW = '/v2/activity-logs/:id';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_ACTIVITY_LOG: string = 'access_activity_log';
export const READ_ACTIVITY_LOG: string = 'read_activity_log';
