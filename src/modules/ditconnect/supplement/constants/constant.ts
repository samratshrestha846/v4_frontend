import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const SUPPLEMENT_LIST = `${DIT_CONNECT}/supplement/list`;
export const SUPPLEMENT_ADD = `${DIT_CONNECT}/supplement/add`;
export const SUPPLEMENT_EDIT = `${DIT_CONNECT}/supplement/edit/:id`;

/** /////// End PATHS //////// */
export const SUPPLEMENT = '/v2/supplements';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_SUPPLEMENT: string = 'access_supplement';
export const CREATE_SUPPLEMENT: string = 'create_supplement';
export const UPDATE_SUPPLEMENT: string = 'update_supplement';
