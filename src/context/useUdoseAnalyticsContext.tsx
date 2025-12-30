import { createContext, useCallback, useContext, useState } from 'react';
import PropertyDashboardAnalytics from '../types/property/analytics';

const UdoseAnalyticsContext = createContext<any>({});

export function useUdoseAnalyticsContext() {
  const context = useContext(UdoseAnalyticsContext);

  if (context == undefined) {
    throw new Error(
      'useUdoseAnalyticsContext must be used within a UdoseAnalyticsContextProvider'
    );
  }

  return context;
}

export function UdoseAnalyticsContextProvider({ children }: any) {
  const [dashboardAnalytics, setDashboardAnalytics] =
    useState<PropertyDashboardAnalytics>({});

  const saveAnalytics = useCallback(
    (analytics: any) => {
      setDashboardAnalytics(analytics);
    },
    [setDashboardAnalytics]
  );

  return (
    <UdoseAnalyticsContext.Provider
      value={{
        dashboardAnalytics,
        saveAnalytics,
      }}>
      {children}
    </UdoseAnalyticsContext.Provider>
  );
}
