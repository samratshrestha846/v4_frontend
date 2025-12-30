import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  STOCKTAKE_LIST,
  STOCKTAKE_ADD,
  STOCKTAKE_EDIT,
  ACCESS_STOCKTAKE,
  CREATE_STOCKTAKE,
  UPDATE_STOCKTAKE,
  STOCKTAKE_VIEW,
  READ_STOCKTAKE,
} from '../constants/constant';

const ListStocktake = React.lazy(() => import('../pages/ListStocktake'));
const AddStocktake = React.lazy(() => import('../pages/AddStocktake'));
const EditStocktake = React.lazy(() => import('../pages/EditStocktake'));
const ViewStocktake = React.lazy(() => import('../pages/ViewStocktake'));

const STOCKTAKE_ROUTE = [
  {
    path: STOCKTAKE_LIST,
    element: (
      <RouteWithPermission
        component={ListStocktake}
        permission={ACCESS_STOCKTAKE}
      />
    ),
  },
  {
    path: STOCKTAKE_ADD,
    element: (
      <RouteWithPermission
        component={AddStocktake}
        permission={CREATE_STOCKTAKE}
      />
    ),
  },
  {
    path: STOCKTAKE_VIEW,
    element: (
      <RouteWithPermission
        component={ViewStocktake}
        permission={READ_STOCKTAKE}
      />
    ),
  },
  {
    path: STOCKTAKE_EDIT,
    element: (
      <RouteWithPermission
        component={EditStocktake}
        permission={UPDATE_STOCKTAKE}
      />
    ),
  },
];
export default STOCKTAKE_ROUTE;
