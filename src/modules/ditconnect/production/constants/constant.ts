import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const PRODUCTION_LIST = `${DIT_CONNECT}/production/list`;
export const PRODUCTION_ADD = `${DIT_CONNECT}/production/add`;
export const PRODUCTION_EDIT = `${DIT_CONNECT}/production/edit/:id`;
export const PRODUCTION_VIEW = `${DIT_CONNECT}/production/view/:id`;

/** /////// End PATHS //////// */
export const PRODUCTION = 'v2/supplement-manufactures';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_PRODUCTION: string = 'access_supplement_manufacture';
export const CREATE_PRODUCTION: string = 'create_supplement_manufacture';
export const UPDATE_PRODUCTION: string = 'update_supplement_manufacture';
export const READ_PRODUCTION: string = 'read_supplement_manufacture';
