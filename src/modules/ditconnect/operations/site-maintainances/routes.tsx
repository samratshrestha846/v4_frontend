import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  ACCESS_SITE_MAINTENANCE,
  CREATE_SITE_MAINTENANCE,
  UPDATE_SITE_MAINTENANCE,
  SITE_MAINTENANCE_ADD,
  SITE_MAINTENANCE_EDIT,
  SITE_MAINTENANCE_LIST,
} from './constants/constant';

const SiteMaintenanceList = React.lazy(() => import('./SiteMaintenanceList'));
const AddSiteMaintenance = React.lazy(() => import('./AddSiteMaintenance'));
const EditSiteMaintenance = React.lazy(() => import('./EditSiteMaintenance'));
const SITE_MAINTENANCE_ROUTE = [
  {
    path: SITE_MAINTENANCE_LIST,
    element: (
      <RouteWithPermission
        component={SiteMaintenanceList}
        permission={ACCESS_SITE_MAINTENANCE}
      />
    ),
  },
  {
    path: SITE_MAINTENANCE_ADD,
    element: (
      <RouteWithPermission
        component={AddSiteMaintenance}
        permission={CREATE_SITE_MAINTENANCE}
      />
    ),
  },
  {
    path: SITE_MAINTENANCE_EDIT,
    element: (
      <RouteWithPermission
        component={EditSiteMaintenance}
        permission={UPDATE_SITE_MAINTENANCE}
      />
    ),
  },
];
export default SITE_MAINTENANCE_ROUTE;
