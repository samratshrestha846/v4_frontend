import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  POLICY_LIST,
  ACCESS_POLICY,
  POLICY_VIEW,
  UPDATE_POLICY,
  POLICY_ADD,
  CREATE_POLICY,
  POLICY_EDIT,
  READ_POLICY,
} from '../constants/constant';

const ListPolicy = React.lazy(() => import('../pages/ListPolicy'));
const ViewPolicy = React.lazy(() => import('../pages/ViewPolicy'));
const EditPolicy = React.lazy(() => import('../pages/EditPolicy'));
const AddPolicy = React.lazy(() => import('../pages/AddPolicy'));

const POLICY_ROUTE = [
  {
    path: POLICY_LIST,
    element: (
      <RouteWithPermission component={ListPolicy} permission={ACCESS_POLICY} />
    ),
  },
  {
    path: POLICY_VIEW,
    element: (
      <RouteWithPermission component={ViewPolicy} permission={READ_POLICY} />
    ),
  },
  {
    path: POLICY_EDIT,
    element: (
      <RouteWithPermission component={EditPolicy} permission={UPDATE_POLICY} />
    ),
  },
  {
    path: POLICY_ADD,
    element: (
      <RouteWithPermission component={AddPolicy} permission={CREATE_POLICY} />
    ),
  },
];
export default POLICY_ROUTE;
