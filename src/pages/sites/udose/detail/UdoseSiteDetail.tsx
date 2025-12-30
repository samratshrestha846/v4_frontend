import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import UdoseDoserCommunicationMessage from './communicationMessage/UdoseDoserCommunicationMessage';
import SiteName from '../../components/SiteName';
import UdoseStartStopSwitch from '../../doser/UdoseStartStopSwitch';
import DetailInfo from '../components/DetailInfo';
import TwentyFourHourGraph from '../components/TwentyFourHourGraph';
import CustomLoader from '../../../../components/CustomLoader';
import useUdoseDetail from './hooks/useUdoseDetail';
import { isEmpty, prepareDynamicUrl } from '../../../../helpers';
import SiteTabs from './SiteTabs';
import { UDOSE_VIEW } from '../../../../constants/path';

const UdoseSiteDetail: React.FC = () => {
  const { udoseDetail: siteDetail, loading } = useUdoseDetail();

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'uDOSE Sites', path: '/udose-sites/list' },
          {
            label: `${siteDetail?.name ?? 'uDOSE Detail'}`,
            path: prepareDynamicUrl(UDOSE_VIEW, siteDetail.id),
            active: true,
          },
        ]}
        title="uDOSE Detail"
      />

      <Row>
        <Col>
          {!loading && (
            <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-2">
              <div className="d-flex justify-content-start align-items-center gap-2 flex-wrap">
                <SiteName siteId={siteDetail.id} siteName={siteDetail.name} />
                <UdoseDoserCommunicationMessage siteDetail={siteDetail} />
              </div>
              <UdoseStartStopSwitch
                siteId={siteDetail.id}
                isDoserRunning={siteDetail.is_running}
              />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <DetailInfo />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <TwentyFourHourGraph />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          {!isEmpty(siteDetail) ? <SiteTabs udoseDetail={siteDetail!} /> : null}
        </Card.Body>
      </Card>
    </>
  );
};

export default UdoseSiteDetail;
