import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  SUPPLIER_LIST,
  ACCESS_SUPPLIER,
  SUPPLIER_EDIT,
  UPDATE_SUPPLIER,
  SUPPLIER_ADD,
  CREATE_SUPPLIER,
} from '../constants/constant';

const ListSupplier = React.lazy(() => import('../pages/ListSupplier'));
const EditSupplier = React.lazy(() => import('../pages/EditSupplier'));
const AddSupplier = React.lazy(() => import('../pages/AddSupplier'));

const SUPPLIER_ROUTE = [
  {
    path: SUPPLIER_LIST,
    element: (
      <RouteWithPermission
        component={ListSupplier}
        permission={ACCESS_SUPPLIER}
      />
    ),
  },
  {
    path: SUPPLIER_EDIT,
    element: (
      <RouteWithPermission
        component={EditSupplier}
        permission={UPDATE_SUPPLIER}
      />
    ),
  },
  {
    path: SUPPLIER_ADD,
    element: (
      <RouteWithPermission
        component={AddSupplier}
        permission={CREATE_SUPPLIER}
      />
    ),
  },
];
export default SUPPLIER_ROUTE;
