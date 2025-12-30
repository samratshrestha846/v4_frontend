import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  SUPPLEMENT_REFILL_LIST,
  ACCESS_SUPPLEMENT_REFILL,
  READ_SUPPLEMENT_REFILL,
  SUPPLEMENT_REFILL_VIEW,
} from '../constants/constant';

const ListSupplementRefill = React.lazy(
  () => import('../pages/ListSupplementRefill')
);
const ViewSupplementRefill = React.lazy(
  () => import('../pages/ViewSupplementRefill')
);

const SUPPLEMENT_REFILL_ROUTE = [
  {
    path: SUPPLEMENT_REFILL_LIST,
    element: (
      <RouteWithPermission
        component={ListSupplementRefill}
        permission={ACCESS_SUPPLEMENT_REFILL}
      />
    ),
  },
  {
    path: SUPPLEMENT_REFILL_VIEW,
    element: (
      <RouteWithPermission
        component={ViewSupplementRefill}
        permission={READ_SUPPLEMENT_REFILL}
      />
    ),
  },
];
export default SUPPLEMENT_REFILL_ROUTE;
