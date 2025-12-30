import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  SUPPLEMENT_MIXING_LIST,
  ACCESS_SUPPLEMENT_MIXING,
  SUPPLEMENT_MIXING_VIEW,
  READ_SUPPLEMENT_MIXING,
} from '../constants/constant';

const ListSupplementMixing = React.lazy(
  () => import('../pages/ListSupplementMixing')
);
const ViewSupplementMixing = React.lazy(
  () => import('../pages/ViewSupplementMixing')
);

const SUPPLEMENT_MIXING_ROUTE = [
  {
    path: SUPPLEMENT_MIXING_LIST,
    element: (
      <RouteWithPermission
        component={ListSupplementMixing}
        permission={ACCESS_SUPPLEMENT_MIXING}
      />
    ),
  },
  {
    path: SUPPLEMENT_MIXING_VIEW,
    element: (
      <RouteWithPermission
        component={ViewSupplementMixing}
        permission={READ_SUPPLEMENT_MIXING}
      />
    ),
  },
];
export default SUPPLEMENT_MIXING_ROUTE;
