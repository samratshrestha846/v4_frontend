import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  SUPPLEMENT_LIST,
  ACCESS_SUPPLEMENT,
  SUPPLEMENT_ADD,
  CREATE_SUPPLEMENT,
  SUPPLEMENT_EDIT,
  UPDATE_SUPPLEMENT,
} from '../constants/constant';

const ListSupplement = React.lazy(() => import('../pages/ListSupplement'));
const AddSupplement = React.lazy(() => import('../pages/AddSupplement'));
const EditSupplement = React.lazy(() => import('../pages/EditSupplement'));

const SUPPLEMENT_ROUTE = [
  {
    path: SUPPLEMENT_LIST,
    element: (
      <RouteWithPermission
        component={ListSupplement}
        permission={ACCESS_SUPPLEMENT}
      />
    ),
  },
  {
    path: SUPPLEMENT_ADD,
    element: (
      <RouteWithPermission
        component={AddSupplement}
        permission={CREATE_SUPPLEMENT}
      />
    ),
  },
  {
    path: SUPPLEMENT_EDIT,
    element: (
      <RouteWithPermission
        component={EditSupplement}
        permission={UPDATE_SUPPLEMENT}
      />
    ),
  },
];
export default SUPPLEMENT_ROUTE;
