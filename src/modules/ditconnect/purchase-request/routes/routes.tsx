import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  PURCHASE_REQUEST_LIST,
  PURCHASE_REQUEST_ADD,
  PURCHASE_REQUEST_EDIT,
  ACCESS_PURCHASE_REQUEST,
  CREATE_PURCHASE_REQUEST,
  UPDATE_PURCHASE_REQUEST,
  PURCHASE_REQUEST_VIEW,
  READ_PURCHASE_REQUEST,
} from '../constants/constant';

const ListPurchaseRequest = React.lazy(
  () => import('../pages/ListPurchaseRequest')
);
const AddPurchaseRequest = React.lazy(
  () => import('../pages/AddPurchaseRequest')
);
const EditPurchaseRequest = React.lazy(
  () => import('../pages/EditPurchaseRequest')
);

const ViewPurchaseRequest = React.lazy(
  () => import('../pages/ViewPurchaseRequest')
);

const PURCHASE_REQUEST_ROUTE = [
  {
    path: PURCHASE_REQUEST_LIST,
    element: (
      <RouteWithPermission
        component={ListPurchaseRequest}
        permission={ACCESS_PURCHASE_REQUEST}
      />
    ),
  },
  {
    path: PURCHASE_REQUEST_ADD,
    element: (
      <RouteWithPermission
        component={AddPurchaseRequest}
        permission={CREATE_PURCHASE_REQUEST}
      />
    ),
  },
  {
    path: PURCHASE_REQUEST_VIEW,
    element: (
      <RouteWithPermission
        component={ViewPurchaseRequest}
        permission={READ_PURCHASE_REQUEST}
      />
    ),
  },
  {
    path: PURCHASE_REQUEST_EDIT,
    element: (
      <RouteWithPermission
        component={EditPurchaseRequest}
        permission={UPDATE_PURCHASE_REQUEST}
      />
    ),
  },
];
export default PURCHASE_REQUEST_ROUTE;
