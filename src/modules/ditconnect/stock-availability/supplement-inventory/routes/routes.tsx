import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  SUPPLEMENT_INVENTORY_LIST,
  ACCESS_SUPPLEMENT_INVENTORY,
  SUPPLEMENT_INVENTORY_VIEW,
  SUPPLEMENT_INVENTORY_EDIT,
} from '../constants/constant';

const ListSupplementInventory = React.lazy(
  () => import('../pages/ListSupplementInventory')
);
const ViewSupplementInventory = React.lazy(
  () => import('../pages/ViewSupplementInventory')
);
const EditSupplementInventory = React.lazy(
  () => import('../pages/AdjustSupplementInventory')
);

const SUPPLEMENT_INVENTORY_ROUTE = [
  {
    path: SUPPLEMENT_INVENTORY_LIST,
    element: (
      <RouteWithPermission
        component={ListSupplementInventory}
        permission={ACCESS_SUPPLEMENT_INVENTORY}
      />
    ),
  },
  {
    path: SUPPLEMENT_INVENTORY_VIEW,
    element: (
      <RouteWithPermission
        component={ViewSupplementInventory}
        permission={ACCESS_SUPPLEMENT_INVENTORY}
      />
    ),
  },
  {
    path: SUPPLEMENT_INVENTORY_EDIT,
    element: (
      <RouteWithPermission
        component={EditSupplementInventory}
        permission={ACCESS_SUPPLEMENT_INVENTORY}
      />
    ),
  },
];
export default SUPPLEMENT_INVENTORY_ROUTE;
