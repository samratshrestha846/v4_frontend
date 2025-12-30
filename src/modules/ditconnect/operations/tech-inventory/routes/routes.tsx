import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';

import {
  TECH_INVENTORY_LIST,
  ACCESS_TECH_INVENTORY,
  TECH_INVENTORY_ADD,
  TECH_INVENTORY_EDIT,
  CREATE_TECH_INVENTORY,
  UPDATE_TECH_INVENTORY,
  READ_INVENTORY_ITEM_FLAG,
  TECH_INVENTORY_FLAG_LIST,
  READ_INVENTORY_ITEM_STOCK,
  TECH_INVENTORY_ITEM_STOCK_LIST,
  TECH_INVENTORY_ITEM_STOCK_SHOW,
} from '../constants/constant';

const ListTechInventory = React.lazy(
  () => import('../pages/ListTechInventory')
);

const AddTechInventory = React.lazy(() => import('../pages/AddTechInventory'));
const EditTechInventory = React.lazy(
  () => import('../pages/EditTechInventory')
);
const InventoryItemFlagList = React.lazy(
  () => import('../pages/InventoryItemFlagList')
);
const InventoryItemStockList = React.lazy(
  () => import('../pages/InventoryItemStockList')
);
const ViewInventoryItemStock = React.lazy(
  () => import('../pages/ViewInventoryItemStock')
);

const TECH_INVENTORY_ROUTE = [
  {
    path: TECH_INVENTORY_LIST,
    element: (
      <RouteWithPermission
        component={ListTechInventory}
        permission={ACCESS_TECH_INVENTORY}
      />
    ),
  },
  {
    path: TECH_INVENTORY_ADD,
    element: (
      <RouteWithPermission
        component={AddTechInventory}
        permission={CREATE_TECH_INVENTORY}
      />
    ),
  },
  {
    path: TECH_INVENTORY_EDIT,
    element: (
      <RouteWithPermission
        component={EditTechInventory}
        permission={UPDATE_TECH_INVENTORY}
      />
    ),
  },
  {
    path: TECH_INVENTORY_FLAG_LIST,
    element: (
      <RouteWithPermission
        component={InventoryItemFlagList}
        permission={READ_INVENTORY_ITEM_FLAG}
      />
    ),
  },
  {
    path: TECH_INVENTORY_ITEM_STOCK_LIST,
    element: (
      <RouteWithPermission
        component={InventoryItemStockList}
        permission={READ_INVENTORY_ITEM_STOCK}
      />
    ),
  },
  {
    path: TECH_INVENTORY_ITEM_STOCK_SHOW,
    element: (
      <RouteWithPermission
        component={ViewInventoryItemStock}
        permission={READ_INVENTORY_ITEM_STOCK}
      />
    ),
  },
];
export default TECH_INVENTORY_ROUTE;
