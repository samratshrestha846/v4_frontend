import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const SUPPLIER_LIST = `${DIT_CONNECT}/supplier/list`;
export const SUPPLIER_ADD = `${DIT_CONNECT}/supplier/add`;
export const SUPPLIER_EDIT = `${DIT_CONNECT}/supplier/edit/:id`;

/** /////// End PATHS //////// */
export const SUPPLIER = '/v2/suppliers';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_SUPPLIER: string = 'access_supplier';
export const CREATE_SUPPLIER: string = 'create_supplier';
export const UPDATE_SUPPLIER: string = 'update_supplier';
export const DELETE_SUPPLIER: string = 'delete_supplier';
