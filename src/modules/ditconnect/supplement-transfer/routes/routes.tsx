import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  SUPPLEMENT_TRANSFER_LIST,
  ACCESS_SUPPLEMENT_TRANSFER,
  SUPPLEMENT_TRANSFER_VIEW,
  READ_SUPPLEMENT_TRANSFER,
} from '../constants/constant';

const ListSupplementTransfer = React.lazy(
  () => import('../pages/ListSupplementTransfer')
);
const ViewSupplementTransfer = React.lazy(
  () => import('../pages/ViewSupplementTransfer')
);

const SUPPLEMENT_TRANSFER_ROUTE = [
  {
    path: SUPPLEMENT_TRANSFER_LIST,
    element: (
      <RouteWithPermission
        component={ListSupplementTransfer}
        permission={ACCESS_SUPPLEMENT_TRANSFER}
      />
    ),
  },
  {
    path: SUPPLEMENT_TRANSFER_VIEW,
    element: (
      <RouteWithPermission
        component={ViewSupplementTransfer}
        permission={READ_SUPPLEMENT_TRANSFER}
      />
    ),
  },
];
export default SUPPLEMENT_TRANSFER_ROUTE;
