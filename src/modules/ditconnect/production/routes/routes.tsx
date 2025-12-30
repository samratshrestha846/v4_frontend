import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  PRODUCTION_LIST,
  PRODUCTION_ADD,
  PRODUCTION_EDIT,
  ACCESS_PRODUCTION,
  CREATE_PRODUCTION,
  UPDATE_PRODUCTION,
  PRODUCTION_VIEW,
  READ_PRODUCTION,
} from '../constants/constant';

const ListProduction = React.lazy(() => import('../pages/ListProduction'));
const AddProduction = React.lazy(() => import('../pages/AddProduction'));
const EditProduction = React.lazy(() => import('../pages/EditProduction'));
const ViewProduction = React.lazy(() => import('../pages/ViewProduction'));

const PRODUCTION_ROUTE = [
  {
    path: PRODUCTION_LIST,
    element: (
      <RouteWithPermission
        component={ListProduction}
        permission={ACCESS_PRODUCTION}
      />
    ),
  },
  {
    path: PRODUCTION_ADD,
    element: (
      <RouteWithPermission
        component={AddProduction}
        permission={CREATE_PRODUCTION}
      />
    ),
  },
  {
    path: PRODUCTION_EDIT,
    element: (
      <RouteWithPermission
        component={EditProduction}
        permission={UPDATE_PRODUCTION}
      />
    ),
  },
  {
    path: PRODUCTION_VIEW,
    element: (
      <RouteWithPermission
        component={ViewProduction}
        permission={READ_PRODUCTION}
      />
    ),
  },
];
export default PRODUCTION_ROUTE;
