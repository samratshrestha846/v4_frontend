import React from 'react';
import { Row, Col } from 'react-bootstrap';

import useAuth from '../../../../../hooks/useAuth';
import SiteHealth from './components/SiteHealth';
import SupplementUsageSummary from './supplementUsageSummary/SupplementUsageSummary';
import ListServiceLogs from '../troubleshooting/siteServiceLogs/ListServiceLogs';
import QuickLinks from './components/QuickLinks';
import SiteLogs from './siteLogs/SiteLogs';

const SiteDashboard: React.FC = () => {
  const { isCustomer, isStationManager } = useAuth();

  return (
    <div className="mt-3">
      {isCustomer || isStationManager ? (
        <ListServiceLogs />
      ) : (
        <>
          <Row>
            <Col sm={3} md={3}>
              <SiteHealth />
            </Col>
            <Col sm={9} md={9}>
              <SupplementUsageSummary />
            </Col>
          </Row>
          <Row>
            <Col sm={3} md={3}>
              <QuickLinks />
            </Col>
            <Col sm={9} md={9}>
              <SiteLogs />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default SiteDashboard;
