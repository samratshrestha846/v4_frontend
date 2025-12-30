import React, { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import UbotSiteInfo from './UbotSiteInfo';
import TankLevel from './TankLevel';
import TankCapacity from './TankCapacity';
import { UbotSite } from '../../../../types/ubot';

type Props = {
  ubotDetail?: UbotSite;
};

const UbotDetail: FC<Props> = ({ ubotDetail }) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={6}>
            <UbotSiteInfo ubotDetail={ubotDetail} />
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
            <TankLevel
              tankLevel={ubotDetail?.latest_ubot_record_hour?.tank_level ?? 0}
            />
            <TankCapacity
              tankCapacity={ubotDetail?.tank_setting?.tank_capacity ?? 0}
              tankLevel={ubotDetail?.latest_ubot_record_hour?.tank_level ?? 0}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default UbotDetail;
