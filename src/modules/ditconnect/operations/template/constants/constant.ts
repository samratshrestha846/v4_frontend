import { DIT_CONNECT } from '../../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const TEMPLATE_LIST = `${DIT_CONNECT}/template/list`;
export const TEMPLATE_ADD = `${DIT_CONNECT}/template/add`;
export const TEMPLATE_EDIT = `${DIT_CONNECT}/template/edit/:id`;
export const TEMPLATE_VIEW = `${DIT_CONNECT}/template/view/:id`;

/** /////// End PATHS //////// */
export const TEMPLATE = '/v2/templates';
export const INPUT_TYPE_DROPDOWN = '/v2/dropdown/input-types';
export const RESPONSE_SET_DROPDOWN = '/v2/dropdown/response-sets';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_TEMPLATE: string = 'access_template';
export const CREATE_TEMPLATE: string = 'create_template';
export const UPDATE_TEMPLATE: string = 'update_template';
export const READ_TEMPLATE: string = 'read_template';
export const DELETE_TEMPLATE: string = 'delete_template';
