import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  ACTIVITY_LOG_LIST,
  ACCESS_ACTIVITY_LOG,
  ACTIVITY_LOG_VIEW,
  READ_ACTIVITY_LOG,
} from '../constants/constant';

const ListActivityLog = React.lazy(() => import('../pages/ListActivityLog'));
const ViewActivityLog = React.lazy(() => import('../pages/ViewActivityLog'));

const ACTIVITY_LOG_ROUTE = [
  {
    path: ACTIVITY_LOG_LIST,
    element: (
      <RouteWithPermission
        component={ListActivityLog}
        permission={ACCESS_ACTIVITY_LOG}
      />
    ),
  },
  {
    path: ACTIVITY_LOG_VIEW,
    element: (
      <RouteWithPermission
        component={ViewActivityLog}
        permission={READ_ACTIVITY_LOG}
      />
    ),
  },
];
export default ACTIVITY_LOG_ROUTE;
