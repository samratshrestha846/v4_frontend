import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@uhub/hooks/useAuth';
import { UNIFIED_DASHBOARD } from '../modules/dashboard/constants/path';
import { UHUB_DASHBOARD } from '../constants/path';
import {
  PLATFORM_DITCONNECT,
  PLATFORM_UNIFIED,
} from '../constants/platformConstants';

const Root = () => {
  const { isCustomer, isStationManager } = useAuth();
  // redirect to intended url if exist in local storage
  const intendedUrl = localStorage.getItem('redirectTo');
  if (intendedUrl) {
    const [, platform] = decodeURIComponent(intendedUrl).split('/');
    if (
      (isCustomer || isStationManager) &&
      [PLATFORM_DITCONNECT, PLATFORM_UNIFIED].includes(platform)
    ) {
      return <Navigate to={UHUB_DASHBOARD} />;
    }
    window.location.href = decodeURIComponent(intendedUrl);
    return null;
  }
  // redirect to uhub dashboard
  if (isCustomer || isStationManager) {
    return <Navigate to={UHUB_DASHBOARD} />;
  }
  // redirect to unified dashboard
  return <Navigate to={UNIFIED_DASHBOARD} />;
};

export default Root;
