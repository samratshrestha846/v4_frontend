import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import React from 'react';
import { NEVILLE_AUTH } from './constant';

const RedirectToNeville = React.lazy(() => import('./RedirectToNeville'));

const NEVILLE_AUTH_ROUTE = [
  {
    path: NEVILLE_AUTH,
    element: <RouteWithPermission component={RedirectToNeville} />,
  },
];

export default NEVILLE_AUTH_ROUTE;
