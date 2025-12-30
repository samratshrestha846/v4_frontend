import React, { FC, useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Udose } from '../../../../types/udose/udoseList';
import useAuth from '../../../../hooks/useAuth';
import SiteDashboard from './siteDashboard/SiteDashboard';
import CostAnalysis from './costAnalysis/CostAnalysis';
import Monitoring from './monitoring/Monitoring';
import Settings from './settings/Settings';
import CarbonAccouting from './carbonAccounting/CarbonAccounting';
import FeedAnalysis from './feedAnalysis/FeedAnalysis';
import AlarmHistory from './alarmHistory/AlarmHistory';
import Rainfall from './rainfall/Rainfall';
import Map from './map/Map';
import SiteActivityList from './activity/SiteActivityList';
import Troubleshooting from './troubleshooting/Troubleshooting';

type Props = {
  udoseDetail: Udose;
};

type TabOption =
  | 'site-dashboard'
  | 'monitoring'
  | 'calculator'
  | 'monitoring'
  | 'settings'
  | 'feed-analysis'
  | 'rainfall'
  | 'map'
  | 'site-activity'
  | 'alarm-history'
  | 'carbon-accounting'
  | 'troubleshooting';

const SiteTabs: FC<Props> = ({ udoseDetail }) => {
  const { isSuperAdmin, isAdmin, isManager } = useAuth();
  const [key, setKey] = useState<TabOption>();

  useEffect(() => {
    const activeTab =
      isSuperAdmin || isAdmin ? 'troubleshooting' : 'site-dashboard';
    setKey(activeTab);
  }, []);

  const isRainfallEnabled = () => {
    let isEnabled = false;

    if (isSuperAdmin || isAdmin || isManager) {
      isEnabled = true;
      return isEnabled;
    }
    udoseDetail?.site_settings?.forEach((setting) => {
      if (setting.key === 'rainfall') {
        if (setting.value === 'enabled') {
          isEnabled = true;
        }
      }
    });
    return isEnabled;
  };

  return (
    <Tabs
      activeKey={key}
      onSelect={(k: any) => setKey(k)}
      className="nav-bg "
      mountOnEnter>
      {(isSuperAdmin || isAdmin) && (
        <Tab
          eventKey="troubleshooting"
          title="Troubleshooting"
          tabClassName="tab-links">
          <Troubleshooting />
        </Tab>
      )}

      <Tab
        eventKey="site-dashboard"
        title="Site Dashboard"
        tabClassName="tab-links">
        <SiteDashboard />
      </Tab>

      <Tab eventKey="calculator" title="Calculator" tabClassName="tab-links">
        <CostAnalysis />
      </Tab>
      <Tab eventKey="monitoring" title="Monitoring" tabClassName="tab-links">
        <Monitoring />
      </Tab>
      <Tab eventKey="settings" title="Settings" tabClassName="tab-links">
        <Settings />
      </Tab>
      <Tab
        eventKey="feed-analysis"
        title="Feed Analysis"
        tabClassName="tab-links">
        <FeedAnalysis />
      </Tab>

      {isRainfallEnabled() && (
        <Tab eventKey="rainfall" title="Rainfall" tabClassName="tab-links">
          <Rainfall />
        </Tab>
      )}

      <Tab eventKey="map" title="Map" tabClassName="tab-links">
        <Map />
      </Tab>
      {(isSuperAdmin || isAdmin) && (
        <Tab
          eventKey="site-activity"
          title="Site Activity"
          tabClassName="tab-links">
          <SiteActivityList />
        </Tab>
      )}
      {(isSuperAdmin || isAdmin) && (
        <Tab
          eventKey="alarm-history"
          title="Alarm History"
          tabClassName="tab-links">
          <AlarmHistory />
        </Tab>
      )}
      {(isSuperAdmin || isAdmin) && (
        <Tab
          eventKey="carbon-accounting"
          title="Carbon Accounting"
          tabClassName="tab-links">
          <CarbonAccouting />
        </Tab>
      )}
    </Tabs>
  );
};

export default SiteTabs;
