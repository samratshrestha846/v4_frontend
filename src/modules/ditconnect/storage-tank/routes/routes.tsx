import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  STORAGE_TANK_LIST,
  ACCESS_STORAGE_TANK,
  STORAGE_TANK_ADD,
  CREATE_STORAGE_TANK,
  STORAGE_TANK_VIEW,
  READ_STORAGE_TANK,
  STORAGE_TANK_EDIT,
  UPDATE_STORAGE_TANK,
} from '../constants/constant';

const ListStorageTank = React.lazy(() => import('../pages/ListStorageTank'));
const AddStorageTank = React.lazy(() => import('../pages/AddStorageTank'));
const EditStorageTank = React.lazy(() => import('../pages/EditStorageTank'));
const ViewStorageTank = React.lazy(() => import('../pages/ViewStorageTank'));

const STORAGE_TANK_ROUTE = [
  {
    path: STORAGE_TANK_LIST,
    element: (
      <RouteWithPermission
        component={ListStorageTank}
        permission={ACCESS_STORAGE_TANK}
      />
    ),
  },
  {
    path: STORAGE_TANK_ADD,
    element: (
      <RouteWithPermission
        component={AddStorageTank}
        permission={CREATE_STORAGE_TANK}
      />
    ),
  },
  {
    path: STORAGE_TANK_VIEW,
    element: (
      <RouteWithPermission
        component={ViewStorageTank}
        permission={READ_STORAGE_TANK}
      />
    ),
  },
  {
    path: STORAGE_TANK_EDIT,
    element: (
      <RouteWithPermission
        component={EditStorageTank}
        permission={UPDATE_STORAGE_TANK}
      />
    ),
  },
];
export default STORAGE_TANK_ROUTE;
