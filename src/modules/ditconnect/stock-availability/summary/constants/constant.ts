import { DIT_CONNECT } from '../../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const SUMMARY_LIST = `${DIT_CONNECT}/stock-availability/summary`;
export const GROUP_SUMMARY_LIST = `${DIT_CONNECT}/stock-availability/group-summary/:id`;
export const SUPPLEMENT_SUMMARY_LIST = `${DIT_CONNECT}/stock-availability/supplement-summary/:id`;

/** /////// End PATHS //////// */
export const SUMMARY = '/v2/supplement-groups';
export const GROUP_SUMMARY = '/v2/supplement-groups/:id/supplements';
export const SUPPLEMENT_SUMMARY = '/v2/supplement-inventories/supplements/:id';
