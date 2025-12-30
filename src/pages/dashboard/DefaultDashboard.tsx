import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DashboardOverview from './overview/DashboardOverview';
import PageTitle from '../../components/PageTitle';

import UbotDashboard from './ubots/UbotDashboard';
import UdoseDashboard from './udose/UdoseDashboard';
import {
  DASHBOARD_TAB_UDOSE,
  dashboardTabOptions,
} from '../../constants/dashboardConstants';
import ScrollRestoration from '../../components/ScrollRestoration';

const DefaultDashboard: React.FC = () => {
  const [activeValue, setActiveValue] = useState<string>(
    localStorage.getItem('dashboard_active_tab') ?? DASHBOARD_TAB_UDOSE
  );

  useEffect(() => {
    localStorage.setItem('dashboard_active_tab', activeValue);
  }, [activeValue]);

  const handleKeyChange = (key: string) => {
    setActiveValue(key);
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[{ label: 'Dashboard', path: '/', active: true }]}
        title="Dashboard"
      />
      <ScrollRestoration />
      <DashboardOverview />

      <div className="button-list d-flex flex-wrap gap-2">
        {dashboardTabOptions.map((item) => {
          return (
            <Button
              key={item.value.toString()}
              variant={item.value === activeValue ? 'info' : `outline-info`}
              onClick={() => handleKeyChange(item.value)}>
              {item.label}
            </Button>
          );
        })}
      </div>
      {activeValue === DASHBOARD_TAB_UDOSE ? (
        <UdoseDashboard />
      ) : (
        <UbotDashboard />
      )}
    </>
  );
};
export default DefaultDashboard;
