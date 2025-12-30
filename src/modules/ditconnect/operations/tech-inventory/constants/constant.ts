import { DIT_CONNECT } from '../../../constants/path';

/** ************************* */
/*    PATHS                 */

/** ************************* */
export const TECH_INVENTORY_LIST = `${DIT_CONNECT}/tech-inventory/list`;
export const TECH_INVENTORY_ADD = `${DIT_CONNECT}/tech-inventory/add`;
export const TECH_INVENTORY_EDIT = `${DIT_CONNECT}/tech-inventory/edit/:id`;
export const TECH_INVENTORY_FLAG_LIST = `${DIT_CONNECT}/tech-inventory/flag`;
export const TECH_INVENTORY_ITEM_STOCK_LIST = `${DIT_CONNECT}/tech-inventory/stocks`;
export const TECH_INVENTORY_ITEM_STOCK_SHOW = `${DIT_CONNECT}/tech-inventory/stocks/:id`;

/** /////// End PATHS //////// */
export const TECH_INVENTORY = '/v2/inventory-items';
export const TECH_INVENTORY_UI = `${TECH_INVENTORY}/ui`;
export const TECH_INVENTORY_SKU = `${TECH_INVENTORY}/sku`;
export const TECH_INVENTORY_ITEM_FLAG = `/v2/inventory-item/flags`;
export const TECH_INVENTORY_ITEM_STOCK = `/v2/inventory-item-stocks`;
export const TECH_INVENTORY_ITEM_COUNT = `${TECH_INVENTORY}/:id/counts`;
export const TECH_INVENTORY_ITEM_COUNTS = '/v2/inventory-item-counts';
export const TECH_INVENTORY_ITEM_EXPORT = `${TECH_INVENTORY}/export`;

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_TECH_INVENTORY: string = 'access_inventory';
export const CREATE_TECH_INVENTORY: string = 'create_inventory';
export const UPDATE_TECH_INVENTORY: string = 'update_inventory';

export const READ_INVENTORY_ITEM_FLAG: string = 'read_inventory_item_flag';
export const READ_INVENTORY_ITEM_STOCK = 'read_inventory_item_stock';

export const DELETE_INVENTORY = 'delete_inventory';
export const EXPORT_INVENTORY = 'export_inventory';
export const ACCESS_INVENTORY = 'access_inventory';
