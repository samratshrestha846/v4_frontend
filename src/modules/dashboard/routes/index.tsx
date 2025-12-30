import React from 'react';
import RouteWithPermission from '../../../routes/RouteWithPermission';
import { UNIFIED_DASHBOARD } from '../constants/path';

const UnifiedDashboard = React.lazy(() => import('../UnifiedDashboard'));

const UNIFIED_DASHBOARD_ROUTE = [
  {
    path: UNIFIED_DASHBOARD,
    element: <RouteWithPermission component={UnifiedDashboard} />,
  },
];

export default UNIFIED_DASHBOARD_ROUTE;
