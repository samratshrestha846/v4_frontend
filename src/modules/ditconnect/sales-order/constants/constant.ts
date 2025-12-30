import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */
export const SALES_ORDER_LIST = `${DIT_CONNECT}/sales-order/list`;
export const SALES_ORDER_ADD = `${DIT_CONNECT}/sales-order/add`;
export const SALES_ORDER_EDIT = `${DIT_CONNECT}/sales-order/edit/:id`;
export const SALES_ORDER_SHOW = `${DIT_CONNECT}/sales-order/:id`;

/** /////// End PATHS //////// */
export const SALES_ORDER = '/v2/sales-order-confirmations';
export const SEND_MESSAGE_SALES_ORDER =
  '/v2/sales-order-confirmations/:id/send-message';
export const UDOSE_INVENTORY_ITEM_DROP_DOWN =
  '/v2/inventory-items/udose/dropdown';
export const ADDITION_ITEM_DROP_DOWN =
  '/v2/sales-order-confirmations/additional-items/dropdown';
export const SUPPLEMENT_CHECK_AVAILABILITY = `/v2/supplements/:id/check-availability`;
export const PRODUCTION_REQUESTS = `/v2/production-requests`;
/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_SALES_ORDER: string = 'access_sales_order_confirmation';
export const CREATE_SALES_ORDER: string = 'create_sales_order_confirmation';
export const UPDATE_SALES_ORDER: string = 'update_sales_order_confirmation';
export const READ_SALES_ORDER: string = 'read_sales_order_confirmation';
export const MODIFY_SALES_ORDER_CONFIRMATION =
  'modify_sales_order_confirmation';
