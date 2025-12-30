import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Site } from '../../../../types/site';
import UbotHome from './widgets/UbotHome';
import { prepareDynamicUrl } from '../../../../helpers';
import { UBOT_VIEW } from '../../../../constants/path';
import UbotCommunicationMessage from '../../../dashboard/ubots/UbotCommunicationMessage';

type Props = {
  ubotDetail: Site;
};

const UbotIndex: React.FC<Props> = ({ ubotDetail }) => {
  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <Link
            className="dashboard-name-link"
            to={prepareDynamicUrl(UBOT_VIEW, ubotDetail.id)}>
            <h5 className="text-primary-color m-0">
              {ubotDetail.name}
              {ubotDetail.site_number ? `(${ubotDetail.site_number})` : null}
            </h5>
          </Link>
        </Card.Header>
        <Card.Body>
          <UbotCommunicationMessage ubotDetail={ubotDetail} />
          <UbotHome ubotDetail={ubotDetail} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UbotIndex;
