import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const STORAGE_TANK_LIST = `${DIT_CONNECT}/storage-tank/list`;
export const STORAGE_TANK_ADD = `${DIT_CONNECT}/storage-tank/add`;
export const STORAGE_TANK_EDIT = `${DIT_CONNECT}/storage-tank/edit/:id`;
export const STORAGE_TANK_VIEW = `${DIT_CONNECT}/storage-tank/view/:id`;

/** /////// End PATHS //////// */
export const STORAGE_TANK = '/v2/storage-tanks';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_STORAGE_TANK: string = 'access_storage_tank';
export const CREATE_STORAGE_TANK: string = 'create_storage_tank';
export const UPDATE_STORAGE_TANK: string = 'update_storage_tank';
export const READ_STORAGE_TANK: string = 'read_storage_tank';
export const DELETE_STORAGE_TANK: string = 'delete_storage_tank';
