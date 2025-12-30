import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  INVENTORY_LOCATION_LIST,
  ACCESS_INVENTORY_LOCATION,
  INVENTORY_LOCATION_ADD,
  CREATE_INVENTORY_LOCATION,
  INVENTORY_LOCATION_EDIT,
  UPDATE_INVENTORY_LOCATION,
} from '../constants/constant';

const ListInventoryLocation = React.lazy(
  () => import('../pages/ListInventoryLocation')
);

const AddInventoryLocation = React.lazy(
  () => import('../pages/AddInventoryLocation')
);

const EditInventoryLocation = React.lazy(
  () => import('../pages/EditInventoryLocation')
);

const INVENTORY_LOCATION_ROUTE = [
  {
    path: INVENTORY_LOCATION_LIST,
    element: (
      <RouteWithPermission
        component={ListInventoryLocation}
        permission={ACCESS_INVENTORY_LOCATION}
      />
    ),
  },
  {
    path: INVENTORY_LOCATION_ADD,
    element: (
      <RouteWithPermission
        component={AddInventoryLocation}
        permission={CREATE_INVENTORY_LOCATION}
      />
    ),
  },
  {
    path: INVENTORY_LOCATION_EDIT,
    element: (
      <RouteWithPermission
        component={EditInventoryLocation}
        permission={UPDATE_INVENTORY_LOCATION}
      />
    ),
  },
];
export default INVENTORY_LOCATION_ROUTE;
