import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  FLEET_VEHICLE_LIST,
  ACCESS_FLEET_VEHICLE,
  FLEET_VEHICLE_ADD,
  FLEET_VEHICLE_EDIT,
  CREATE_FLEET_VEHICLE,
  UPDATE_FLEET_VEHICLE,
  READ_FLEET_VEHICLE,
  FLEET_VEHICLE_VIEW,
} from '../constants/constant';

const ListFleetVehicle = React.lazy(() => import('../pages/ListFleetVehicle'));
const AddFleetVehicle = React.lazy(() => import('../pages/AddFleetVehicle'));
const EditFleetVehicle = React.lazy(() => import('../pages/EditFleetVehicle'));
const ViewFleetVehicle = React.lazy(() => import('../pages/ViewFleetVehicle'));

const FLEET_VEHICLE_ROUTE = [
  {
    path: FLEET_VEHICLE_LIST,
    element: (
      <RouteWithPermission
        component={ListFleetVehicle}
        permission={ACCESS_FLEET_VEHICLE}
      />
    ),
  },
  {
    path: FLEET_VEHICLE_ADD,
    element: (
      <RouteWithPermission
        component={AddFleetVehicle}
        permission={CREATE_FLEET_VEHICLE}
      />
    ),
  },

  {
    path: FLEET_VEHICLE_EDIT,
    element: (
      <RouteWithPermission
        component={EditFleetVehicle}
        permission={UPDATE_FLEET_VEHICLE}
      />
    ),
  },

  {
    path: FLEET_VEHICLE_VIEW,
    element: (
      <RouteWithPermission
        component={ViewFleetVehicle}
        permission={READ_FLEET_VEHICLE}
      />
    ),
  },
];
export default FLEET_VEHICLE_ROUTE;
