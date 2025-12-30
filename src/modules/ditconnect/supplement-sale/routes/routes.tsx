import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  SUPPLEMENT_SALE_LIST,
  ACCESS_SUPPLEMENT_SALE,
  SUPPLEMENT_SALE_VIEW,
  READ_SUPPLEMENT_SALE,
} from '../constants/constant';

const ListSupplementSale = React.lazy(
  () => import('../pages/ListSupplementSale')
);
const ViewSupplementSale = React.lazy(
  () => import('../pages/ViewSupplementSale')
);

const SUPPLEMENT_SALE_ROUTE = [
  {
    path: SUPPLEMENT_SALE_LIST,
    element: (
      <RouteWithPermission
        component={ListSupplementSale}
        permission={ACCESS_SUPPLEMENT_SALE}
      />
    ),
  },
  {
    path: SUPPLEMENT_SALE_VIEW,
    element: (
      <RouteWithPermission
        component={ViewSupplementSale}
        permission={READ_SUPPLEMENT_SALE}
      />
    ),
  },
];
export default SUPPLEMENT_SALE_ROUTE;
