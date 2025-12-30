import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  RESPONSE_SET_LIST,
  RESPONSE_SET_ADD,
  RESPONSE_SET_EDIT,
  ACCESS_RESPONSE_SET,
  CREATE_RESPONSE_SET,
  UPDATE_RESPONSE_SET,
} from '../constants/constant';

const ListResponseSet = React.lazy(() => import('../pages/ListResponseSet'));
const AddResponseSet = React.lazy(() => import('../pages/AddResponseSet'));
const EditResponseSet = React.lazy(() => import('../pages/EditResponseSet'));

const RESPONSE_SET_ROUTE = [
  {
    path: RESPONSE_SET_LIST,
    element: (
      <RouteWithPermission
        component={ListResponseSet}
        permission={ACCESS_RESPONSE_SET}
      />
    ),
  },
  {
    path: RESPONSE_SET_ADD,
    element: (
      <RouteWithPermission
        component={AddResponseSet}
        permission={CREATE_RESPONSE_SET}
      />
    ),
  },
  {
    path: RESPONSE_SET_EDIT,
    element: (
      <RouteWithPermission
        component={EditResponseSet}
        permission={UPDATE_RESPONSE_SET}
      />
    ),
  },
];
export default RESPONSE_SET_ROUTE;
