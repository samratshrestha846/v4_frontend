import { LabelValueDropdown } from '@uhub/types/common';
import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const SUPPLEMENT_TRANSFER_LIST = `${DIT_CONNECT}/supplement-transfer/list`;
export const SUPPLEMENT_TRANSFER_VIEW = `${DIT_CONNECT}/supplement-transfer/view/:id`;

/** /////// End PATHS //////// */
export const SUPPLEMENT_TRANSFER = '/v2/supplement-transfers';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_SUPPLEMENT_TRANSFER: string = 'access_supplement_transfer';
export const UPDATE_SUPPLEMENT_TRANSFER: string = 'update_supplement_transfer';
export const MODIFY_SUPPLEMENT_TRANSFER: string = 'modify_supplement_transfer';
export const READ_SUPPLEMENT_TRANSFER: string = 'read_supplement_transfer';

/** ************************* */
/*    SUPPLEMENT STATUS           */
/** ************************* */

export const SUPPLEMENT_STATUS_PENDING: string = 'Pending';
export const SUPPLEMENT_STATUS_COMPLETED: string = 'Completed';

export const SUPPLEMENT_STATUS_OPTIONS: LabelValueDropdown[] = [
  {
    label: SUPPLEMENT_STATUS_PENDING,
    value: SUPPLEMENT_STATUS_PENDING,
  },
  {
    label: SUPPLEMENT_STATUS_COMPLETED,
    value: SUPPLEMENT_STATUS_COMPLETED,
  },
];
