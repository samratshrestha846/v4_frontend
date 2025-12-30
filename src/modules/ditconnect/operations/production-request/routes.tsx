import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  ACCESS_PRODUCTION_REQUEST,
  PRODUCTION_REQUEST_LIST,
} from './constants/constant';

const ProductionRequestList = React.lazy(
  () => import('./ProductionRequestList')
);
const PRODUCTION_REQUEST_ROUTE = [
  {
    path: PRODUCTION_REQUEST_LIST,
    element: (
      <RouteWithPermission
        component={ProductionRequestList}
        permission={ACCESS_PRODUCTION_REQUEST}
      />
    ),
  },
];
export default PRODUCTION_REQUEST_ROUTE;
