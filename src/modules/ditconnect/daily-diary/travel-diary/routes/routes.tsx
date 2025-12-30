import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import { TRAVEL_DIARY_VIEW, READ_TRAVEL_DIARY } from '../constants/constant';

const ViewTravelDiary = React.lazy(() => import('../pages/ViewTravelDiary'));

const TRAVEL_DIARY_ROUTE = [
  {
    path: TRAVEL_DIARY_VIEW,
    element: (
      <RouteWithPermission
        component={ViewTravelDiary}
        permission={READ_TRAVEL_DIARY}
      />
    ),
  },
];
export default TRAVEL_DIARY_ROUTE;
