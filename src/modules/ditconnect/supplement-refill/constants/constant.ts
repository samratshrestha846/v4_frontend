import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const SUPPLEMENT_REFILL_LIST = `${DIT_CONNECT}/supplement-refill/list`;
export const SUPPLEMENT_REFILL_ADD = `${DIT_CONNECT}/supplement-refill/add`;
export const SUPPLEMENT_REFILL_VIEW = `${DIT_CONNECT}/supplement-refill/view/:id`;

/** /////// End PATHS //////// */
export const SUPPLEMENT_REFILL = '/v2/supplement-refills';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_SUPPLEMENT_REFILL: string = 'access_supplement_refill';
export const READ_SUPPLEMENT_REFILL: string = 'read_supplement_refill';
export const UPDATE_SUPPLEMENT_REFILL: string = 'update_supplement_refill';
export const MODIFY_SUPPLEMENT_REFILL: string = 'modify_supplement_refill';
