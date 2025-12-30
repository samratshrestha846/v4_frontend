import { LabelValueDropdown } from '@uhub/types/common';

/** /////// End PATHS //////// */
export const PAYMENT = '/v2/purchase-request-payments';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const CREATE_PURCHASE_REQUEST_PAYMENT =
  'create_purchase_request_payment';

/** ************************* */
/*    PAYMENT METHODS           */
/** ************************* */

export const PAYMENT_METHOD_CASH = 'Cash';
export const PAYMENT_METHOD_BANK = 'Bank';
export const PAYMENT_METHOD_CHEQUE = 'Cheque';

export const PAYMENT_METHOD_OPTIONS: LabelValueDropdown[] = [
  { label: PAYMENT_METHOD_CASH, value: PAYMENT_METHOD_CASH },
  { label: PAYMENT_METHOD_BANK, value: PAYMENT_METHOD_BANK },
  { label: PAYMENT_METHOD_CHEQUE, value: PAYMENT_METHOD_CHEQUE },
];
