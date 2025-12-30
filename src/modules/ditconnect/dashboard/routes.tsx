import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import { DIT_CONNECT_DASHBOARD } from '../constants/path';

const DITDashboard = React.lazy(() => import('./DITDashboard'));

const DIT_CONNECT_DASHBOARD_ROUTE = [
  {
    path: DIT_CONNECT_DASHBOARD,
    element: <RouteWithPermission component={DITDashboard} />,
  },
];
export default DIT_CONNECT_DASHBOARD_ROUTE;
