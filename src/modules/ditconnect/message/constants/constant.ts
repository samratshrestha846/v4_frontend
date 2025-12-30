import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const MESSAGE_LIST = `${DIT_CONNECT}/message/list`;
export const MESSAGE_ADD = `${DIT_CONNECT}/message/add`;
export const MESSAGE_EDIT = `${DIT_CONNECT}/message/edit/:id`;

/** /////// End PATHS //////// */
export const MESSAGE = '/v2/messages';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_MESSAGE: string = 'access_message';
export const CREATE_MESSAGE: string = 'create_message';
export const UPDATE_MESSAGE: string = 'update_message';
