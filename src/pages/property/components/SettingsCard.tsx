import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { prepareDynamicUrl } from '../../../helpers';
import { ALERT_SETTING_BY_CUSTOMER_PROPERTY } from '../../../constants/path';

type Props = {
  propertyId?: number;
};

const SettingsCard: React.FC<Props> = ({ propertyId }) => {
  return (
    <Card className="">
      <Card.Header as="h5" className="px-2 fw-meium text-primary-color">
        Settings
      </Card.Header>
      <Card.Body className="p-2">
        <Link
          to={prepareDynamicUrl(
            ALERT_SETTING_BY_CUSTOMER_PROPERTY,
            propertyId
          )}>
          <i className="bx bx-cog me-1" />
          Ceres Tag Alert Notification Setting
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SettingsCard;
