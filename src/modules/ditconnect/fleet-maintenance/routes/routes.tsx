import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  FLEET_MAINTENANCE_LIST,
  ACCESS_FLEET_MAINTENANCE,
  FLEET_MAINTENANCE_VIEW,
} from '../constants/constant';

const ListFleetMaintenance = React.lazy(
  () => import('../pages/ListFleetMaintenance')
);

const ViewFleetMaintenance = React.lazy(
  () => import('../pages/ViewFleetMaintenance')
);

const FLEET_MAINTENANCE_ROUTE = [
  {
    path: FLEET_MAINTENANCE_LIST,
    element: (
      <RouteWithPermission
        component={ListFleetMaintenance}
        permission={ACCESS_FLEET_MAINTENANCE}
      />
    ),
  },
  {
    path: FLEET_MAINTENANCE_VIEW,
    element: (
      <RouteWithPermission
        component={ViewFleetMaintenance}
        permission={ACCESS_FLEET_MAINTENANCE}
      />
    ),
  },
];
export default FLEET_MAINTENANCE_ROUTE;
