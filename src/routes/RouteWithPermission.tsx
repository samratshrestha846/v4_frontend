import React, { FC, LazyExoticComponent, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@uhub/hooks/useAuth';
import { APICore } from '../helpers/api/apiCore';
import { can } from '../helpers/checkPermission';
import {
  UPDATE_UDOSE,
  UPDATE_UDOSE_MINI,
  UPDATE_UTANK,
} from '../constants/permissions';
import ga from '../utils/ga/ga-init';
import { PERMISSION_EXCLUDED_ROUTES } from '../constants/permissionExcludedRoutes';

import {
  PLATFORM_DITCONNECT,
  PLATFORM_UNIFIED,
} from '../constants/platformConstants';
import { UHUB_DASHBOARD } from '../constants/path';

const loading = () => <div className="" />;

type LoadComponentProps = {
  /** eslint-ignore */
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  type?: string;
  siteMode?: string;
};

const LoadComponent = ({
  component: Component,
  type,
  siteMode,
}: LoadComponentProps) => (
  <Suspense fallback={loading()}>
    <Component type={type} siteMode={siteMode} />
  </Suspense>
);

type RouteWithPermissionProps = {
  component: LazyExoticComponent<FC<any>>;
  permission?: string;
  type?: string;
  siteMode?: string;
};

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line
const RouteWithPermission = ({
  component: RouteComponent,
  permission,
  type,
  siteMode,
  // eslint-disable-next-line no-unused-vars
  ...rest
}: RouteWithPermissionProps) => {
  const location = useLocation();
  const api = new APICore();
  const loggedInUser = api.getLoggedInUser();
  const canDo = can(permission ?? '');
  /**
   * if customer or station manager user tries to access url with prefix: dit-connect or unified then redirect to uhub dashboard
   */
  const { isCustomer, isStationManager } = useAuth();
  if (isCustomer || isStationManager) {
    const [, platform] = location.pathname.split('/');
    if ([PLATFORM_DITCONNECT, PLATFORM_UNIFIED].includes(platform)) {
      return <Navigate to={{ pathname: UHUB_DASHBOARD }} replace />;
    }
  }

  /**
   * not logged in so redirect to login page with the return url
   */
  if (api.isUserAuthenticated() === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // get name of user role
  let roleName = loggedInUser?.roles?.[0]?.name;
  if (!roleName) {
    roleName = 'guest';
  }
  ga.setUserRoleType(roleName);

  // if routes donot required any permissions
  const currentPath = location.pathname
    .split('/')
    .map((item) => (Number.isNaN(parseInt(item, 10)) ? item : ':id'))
    .join('/');
  if (
    PERMISSION_EXCLUDED_ROUTES.map((item) => item.pathname).includes(
      currentPath
    )
  ) {
    return <LoadComponent component={RouteComponent} />;
  }

  if (canDo) {
    if (permission === UPDATE_UDOSE || UPDATE_UDOSE_MINI || UPDATE_UTANK) {
      return (
        <LoadComponent
          component={RouteComponent}
          siteMode={siteMode}
          type={type}
        />
      );
    }
    return <LoadComponent component={RouteComponent} />;
    // eslint-disable-next-line no-else-return
  } else {
    return <Navigate to={{ pathname: '/permission-denied' }} />;
  }
};

export default RouteWithPermission;
