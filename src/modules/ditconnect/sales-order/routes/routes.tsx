import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  SALES_ORDER_LIST,
  ACCESS_SALES_ORDER,
  SALES_ORDER_ADD,
  CREATE_SALES_ORDER,
  UPDATE_SALES_ORDER,
  SALES_ORDER_EDIT,
  SALES_ORDER_SHOW,
  READ_SALES_ORDER,
} from '../constants/constant';

const ListSalesOrder = React.lazy(() => import('../pages/ListSalesOrder'));
const AddSalesOrder = React.lazy(() => import('../pages/AddSalesOrder'));
const EditSalesOrder = React.lazy(() => import('../pages/EditSalesOrder'));
const ViewSalesOrder = React.lazy(() => import('../pages/ViewSalesOrder'));

const SALES_ORDER_ROUTE = [
  {
    path: SALES_ORDER_LIST,
    element: (
      <RouteWithPermission
        component={ListSalesOrder}
        permission={ACCESS_SALES_ORDER}
      />
    ),
  },
  {
    path: SALES_ORDER_ADD,
    element: (
      <RouteWithPermission
        component={AddSalesOrder}
        permission={CREATE_SALES_ORDER}
      />
    ),
  },
  {
    path: SALES_ORDER_EDIT,
    element: (
      <RouteWithPermission
        component={EditSalesOrder}
        permission={UPDATE_SALES_ORDER}
      />
    ),
  },
  {
    path: SALES_ORDER_SHOW,
    element: (
      <RouteWithPermission
        component={ViewSalesOrder}
        permission={READ_SALES_ORDER}
      />
    ),
  },
];
export default SALES_ORDER_ROUTE;
