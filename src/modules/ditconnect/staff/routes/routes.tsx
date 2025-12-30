import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  STAFF_LIST,
  STAFF_EDIT,
  ACCESS_STAFF,
  UPDATE_STAFF,
  STAFF_VIEW,
  READ_STAFF,
} from '../constants/constant';

const ListStaff = React.lazy(() => import('../pages/ListStaff'));
const EditStaff = React.lazy(() => import('../pages/EditStaff'));
const ViewStaff = React.lazy(() => import('../pages/ViewStaff'));

const STAFF_ROUTE = [
  {
    path: STAFF_LIST,
    element: (
      <RouteWithPermission component={ListStaff} permission={ACCESS_STAFF} />
    ),
  },
  {
    path: STAFF_EDIT,
    element: (
      <RouteWithPermission component={EditStaff} permission={UPDATE_STAFF} />
    ),
  },
  {
    path: STAFF_VIEW,
    element: (
      <RouteWithPermission component={ViewStaff} permission={READ_STAFF} />
    ),
  },
];
export default STAFF_ROUTE;
