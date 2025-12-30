import { DIT_CONNECT } from '../../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const TASK_LIST = `${DIT_CONNECT}/task/list`;
export const TASK_ADD = `${DIT_CONNECT}/task/add`;
export const TASK_EDIT = `${DIT_CONNECT}/task/edit/:id`;
export const TASK_VIEW = `${DIT_CONNECT}/task/:id`;

/** /////// End PATHS //////// */
export const TASK = '/v2/tasks';
export const TASK_PREVIEW_PDF = `/v2/tasks/:id/preview-pdf`;
export const SUPPLEMENT_INVENTORIES_DROPDOWN =
  '/v2/supplement-inventories/dropdown';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_TASK: string = 'access_task';
export const CREATE_TASK: string = 'create_task';
export const UPDATE_TASK: string = 'update_task';
export const READ_TASK: string = 'read_task';
export const DELETE_TASK: string = 'delete_task';
