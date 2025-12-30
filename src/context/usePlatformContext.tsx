import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { APICore } from '@uhub/helpers/api/apiCore';
import useAuth from '@uhub/hooks/useAuth';
import {
  PLATFORM_DITCONNECT,
  PLATFORM_NEVILLE,
  PLATFORM_UHUB,
  PLATFORM_UNIFIED,
} from '../constants/platformConstants';
import { LOGIN } from '../constants/path';

type PlatformContextProviderProps = {
  children: React.ReactNode;
};

type ActivePlatform = {
  platform: string;
};

// Create a context
const PlatformContext = createContext({
  activePlatform: {
    platform: PLATFORM_UNIFIED,
  },
  // eslint-disable-next-line no-unused-vars
  switchPlatform: (val: ActivePlatform) => {},
});

// Create a context provioder
export const PlatformContextProvider = ({
  children,
}: PlatformContextProviderProps) => {
  const [activePlatform, setActivePlatform] = useState<ActivePlatform>({
    platform: PLATFORM_UNIFIED,
  });
  const location = useLocation();

  const { isCustomer, isStationManager } = useAuth();

  const api = new APICore();
  if (!api.getLoggedInUser()) {
    // set redirectTo path in session storage
    localStorage.setItem('redirectTo', encodeURIComponent(location.pathname));
    // redirect to login if user not available
    window.location.href = LOGIN;
  } else {
    localStorage.removeItem('redirectTo');
  }

  const switchPlatform = (val: ActivePlatform) => {
    setActivePlatform(val);
  };

  const value = useMemo(
    () => ({ activePlatform, switchPlatform }),
    [activePlatform, switchPlatform]
  );

  useEffect(() => {
    let isMounted = true;
    const splittedPath = location.pathname.split('/');
    // if user is customer or station manager then always set the platform to uhub
    if (isCustomer || isStationManager) {
      switchPlatform({
        platform: PLATFORM_UHUB,
      });
    } else if (splittedPath[1] !== activePlatform.platform && isMounted) {
      switchPlatform({
        platform: [
          PLATFORM_UHUB,
          PLATFORM_DITCONNECT,
          PLATFORM_NEVILLE,
        ].includes(splittedPath[1])
          ? splittedPath[1]
          : PLATFORM_UHUB,
      });
    }

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  );
};

// Custom hook to use the context
export const usePlatformContext = () => {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error(
      'usePlatformContext must be used within a PlatformContextProvider'
    );
  }

  return context;
};
