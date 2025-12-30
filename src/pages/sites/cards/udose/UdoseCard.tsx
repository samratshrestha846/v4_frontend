import React from 'react';
import { Card, Col } from 'react-bootstrap';
import UdoseHome from './widgets/Home';
import { Site } from '../../../../types/site';
import UdoseStartStopSwitch from '../../doser/UdoseStartStopSwitch';
import UdoseDoserCommunicationMessage from '../../udose/detail/communicationMessage/UdoseDoserCommunicationMessage';
import UdoseSiteName from '../../../dashboard/udose/components/UdoseSiteName';

type Props = {
  siteDetail: Site;
};

const UdoseCard: React.FC<Props> = ({ siteDetail }) => {
  return (
    <Col xl={12}>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-2">
            <div className="d-flex justify-content-start align-items-center gap-2 flex-wrap">
              <UdoseSiteName
                siteId={siteDetail?.id}
                siteName={siteDetail?.name}
                siteNumber={siteDetail?.site_number}
              />
              <UdoseDoserCommunicationMessage
                siteDetail={siteDetail}
                isDashboard
              />
            </div>
            <UdoseStartStopSwitch
              siteId={siteDetail?.id}
              isDoserRunning={siteDetail?.is_running}
            />
          </div>
          <UdoseHome siteDetail={siteDetail} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UdoseCard;
