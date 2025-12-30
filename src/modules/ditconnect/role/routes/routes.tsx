import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  ROLE_LIST,
  ACCESS_ROLE,
  ROLE_EDIT,
  ROLE_VIEW,
  ROLE_ADD,
} from '../constants/constant';

const ListRole = React.lazy(() => import('../pages/ListRole'));
const EditRole = React.lazy(() => import('../pages/EditRole'));
const ViewRole = React.lazy(() => import('../pages/ViewRole'));
const AddRole = React.lazy(() => import('../pages/AddRole'));

const ROLE_ROUTE = [
  {
    path: ROLE_LIST,
    element: (
      <RouteWithPermission component={ListRole} permission={ACCESS_ROLE} />
    ),
  },
  {
    path: ROLE_EDIT,
    element: (
      <RouteWithPermission component={EditRole} permission={ACCESS_ROLE} />
    ),
  },
  {
    path: ROLE_VIEW,
    element: (
      <RouteWithPermission component={ViewRole} permission={ACCESS_ROLE} />
    ),
  },
  {
    path: ROLE_ADD,
    element: (
      <RouteWithPermission component={AddRole} permission={ACCESS_ROLE} />
    ),
  },
];
export default ROLE_ROUTE;
