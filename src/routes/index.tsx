import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
// import UdoseInstallationList from '@project/ditconnect/operations/UdoseInstallationList';

import DIT_CONNECT_ROUTE from '@project/ditconnect/routes';
import ResetPassword from '../pages/account/ResetPassword';
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import Root from './Root';

import UNIFIED_DASHBOARD_ROUTE from '../modules/dashboard/routes';
import UHUB_ROUTES from './uhubRoutes';
import UnifiedLayout from '../modules/dashboard/unified-layout/UnifiedLayout';
import { NEVILLE_AUTH } from '../modules/neville/constant';
import NEVILLE_AUTH_ROUTE from '../modules/neville/routes';

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Confirm = React.lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = React.lazy(
  () => import('../pages/account/ForgetPassword')
);
const ErrorPageNotFound = React.lazy(
  () => import('../pages/error/PageNotFound')
);
const PermissionError = React.lazy(
  () => import('../pages/error/PermissionError')
);

// change default password

const ChangeDefaultPassword = React.lazy(
  () => import('../pages/account/ChangeDefaultPassword')
);

// ceres tags
const CustomerAuthenticationEndpoint = React.lazy(
  () => import('../pages/ceresTag/CustomerAuthenticationEndpoint')
);

// mfa
const UserVerification = React.lazy(
  () => import('../pages/account/UserVerification')
);

// costFeed
const CostFeed = React.lazy(
  () => import('../pages/cost-feed/CostFeedAnalysis')
);
const loading = () => <div className="" />;

type LoadComponentProps = {
  component: any;
  siteMode?: string;
  type?: string;
};

const LoadComponent = ({
  component: Component,
  type,
  siteMode,
}: LoadComponentProps) => (
  <Suspense fallback={loading()}>
    <Component siteMode={siteMode} type={type} />
  </Suspense>
);

const AllRoutes = () => {
  return useRoutes([
    { path: '/', element: <Root /> },
    {
      // public routes
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: 'login',
          element: <LoadComponent component={Login} />,
        },
        {
          path: 'customer-authentication-endpoint',
          element: <LoadComponent component={CustomerAuthenticationEndpoint} />,
        },
        {
          path: 'account/logout',
          element: <LoadComponent component={Logout} />,
        },
        {
          path: 'account/confirm',
          element: <LoadComponent component={Confirm} />,
        },
        {
          path: 'forget-password',
          element: <LoadComponent component={ForgetPassword} />,
        },
        {
          path: 'password-reset/:token',
          element: <LoadComponent component={ResetPassword} />,
        },
        {
          path: 'login/verify-otp/:token',
          element: <LoadComponent component={UserVerification} />,
        },
        {
          path: 'page-not-found',
          element: <LoadComponent component={ErrorPageNotFound} />,
        },
        {
          path: 'permission-denied',
          element: <LoadComponent component={PermissionError} />,
        },
        {
          path: 'calculate-cost-feed',
          element: <LoadComponent component={CostFeed} />,
        },
        {
          path: 'auth/change-password',
          element: <LoadComponent component={ChangeDefaultPassword} />,
        },
      ],
    },
    // unified dashboard routes
    {
      path: '/unified/',
      element: <UnifiedLayout />,
      children: [...UNIFIED_DASHBOARD_ROUTE],
    },
    {
      path: NEVILLE_AUTH,
      element: <UnifiedLayout />,
      children: [...NEVILLE_AUTH_ROUTE],
    },
    // uhub routes
    {
      path: '/',
      element: <VerticalLayout />,
      children: [...UHUB_ROUTES],
    },
    // dit-connect routes
    {
      path: '/dit-connect/',
      element: <VerticalLayout />,
      children: [...DIT_CONNECT_ROUTE],
    },
    // handle unregistered routes
    { path: '*', element: <LoadComponent component={ErrorPageNotFound} /> },
  ]);
};

export default AllRoutes;
