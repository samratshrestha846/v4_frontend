import { DIT_CONNECT } from '../../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const SUPPLEMENT_INVENTORY_LIST = `${DIT_CONNECT}/supplement-inventory/list`;
export const SUPPLEMENT_INVENTORY_EDIT = `${DIT_CONNECT}/supplement-inventory/edit/:id`;
export const SUPPLEMENT_INVENTORY_VIEW = `${DIT_CONNECT}/supplement-inventory/view/:id`;

/** /////// End PATHS //////// */
export const SUPPLEMENT_INVENTORY = 'v2/supplement-inventories';
export const SUPPLEMENT_INENTORY_ADJUSTMENT = 'v2/adjust-inventory';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_SUPPLEMENT_INVENTORY: string =
  'access_supplement_inventory';
export const READ_SUPPLEMENT_INVENTORY: string = 'read_supplement_inventory';
export const UPDATE_SUPPLEMENT_INVENTORY: string =
  'adjust_supplement_inventory';
export const EXPORT_SUPPLEMENT_INVENTORY: string =
  'export_supplement_inventory';
