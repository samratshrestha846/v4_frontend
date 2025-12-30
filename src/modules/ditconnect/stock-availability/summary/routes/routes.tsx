import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  SUMMARY_LIST,
  GROUP_SUMMARY_LIST,
  SUPPLEMENT_SUMMARY_LIST,
} from '../constants/constant';
import { ACCESS_SUPPLEMENT_INVENTORY } from '../../supplement-inventory/constants/constant';

const StockAvailabilityTab = React.lazy(
  () => import('../pages/StockAvailabilityTab')
);
const ListGroupSummary = React.lazy(() => import('../pages/ListGroupSummary'));
const ListSupplementSummary = React.lazy(
  () => import('../pages/ListSupplementSummary')
);

const STOCK_AVAILABILITY_ROUTE = [
  {
    path: SUMMARY_LIST,
    element: (
      <RouteWithPermission
        component={StockAvailabilityTab}
        permission={ACCESS_SUPPLEMENT_INVENTORY}
      />
    ),
  },
  {
    path: GROUP_SUMMARY_LIST,
    element: (
      <RouteWithPermission
        component={ListGroupSummary}
        permission={ACCESS_SUPPLEMENT_INVENTORY}
      />
    ),
  },
  {
    path: SUPPLEMENT_SUMMARY_LIST,
    element: (
      <RouteWithPermission
        component={ListSupplementSummary}
        permission={ACCESS_SUPPLEMENT_INVENTORY}
      />
    ),
  },
];
export default STOCK_AVAILABILITY_ROUTE;
