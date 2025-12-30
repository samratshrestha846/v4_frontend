import { LabelValueDropdown } from '@uhub/types/common';
import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const STOCKTAKE_LIST = `${DIT_CONNECT}/stocktake/list`;
export const STOCKTAKE_ADD = `${DIT_CONNECT}/stocktake/add`;
export const STOCKTAKE_EDIT = `${DIT_CONNECT}/stocktake/edit/:id`;
export const STOCKTAKE_VIEW = `${DIT_CONNECT}/stocktake/view/:id`;

/** /////// End PATHS //////// */
export const STOCKTAKE = '/v2/stocktakes';
export const STOCKTAKE_APPROVE = '/v2/stocktakes/:id/approve';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_STOCKTAKE: string = 'access_stocktake';
export const CREATE_STOCKTAKE: string = 'create_stocktake';
export const UPDATE_STOCKTAKE: string = 'update_stocktake';
export const READ_STOCKTAKE: string = 'read_stocktake';
export const APPROVE_STOCKTAKE: string = 'approve_stocktake';

/** ************************* */
/*    STATUS           */
/** ************************* */

export const STOCKTAKE_STATUS_PENDING: string = 'Pending';
export const STOCKTAKE_STATUS_APPROVED: string = 'Approved';
export const STOCKTAKE_STATUS: LabelValueDropdown[] = [
  { label: STOCKTAKE_STATUS_PENDING, value: STOCKTAKE_STATUS_PENDING },
  { label: STOCKTAKE_STATUS_APPROVED, value: STOCKTAKE_STATUS_APPROVED },
];
