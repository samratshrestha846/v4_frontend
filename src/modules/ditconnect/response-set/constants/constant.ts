import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const RESPONSE_SET_LIST = `${DIT_CONNECT}/response-set/list`;
export const RESPONSE_SET_ADD = `${DIT_CONNECT}/response-set/add`;
export const RESPONSE_SET_EDIT = `${DIT_CONNECT}/response-set/edit/:id`;

/** /////// End PATHS //////// */
export const RESPONSE_SET = '/v2/response-sets';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_RESPONSE_SET: string = 'access_response_set';
export const CREATE_RESPONSE_SET: string = 'create_response_set';
export const UPDATE_RESPONSE_SET: string = 'update_response_set';
export const DELETE_RESPONSE_SET: string = 'delete_response_set';
