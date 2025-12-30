import React from 'react';
import { Card } from 'react-bootstrap';
import { UdoseHealth } from '../../../../../types/udose/udoseSummary';
import { prepareDynamicUrl } from '../../../../../helpers';
import { VOLTAGE_SUMMARY_BY_SITE } from '../../../../../constants/path';
import HeaderWithExternalLink from '../../../../../components/HeaderWithExternalLink';
import BatterySolarVoltageAreaChart from './charts/BatterySolarVoltageAreaChart';

type Props = {
  udoseHealth: UdoseHealth[];
  id?: number;
};

const BatterySolarVoltage: React.FC<Props> = ({ udoseHealth, id }) => {
  return (
    <Card>
      <Card.Header>
        <HeaderWithExternalLink
          title="Battery Solar Voltage"
          linkPathname={prepareDynamicUrl(VOLTAGE_SUMMARY_BY_SITE, id)}
        />
      </Card.Header>
      <Card.Body className="p-0">
        <BatterySolarVoltageAreaChart udoseHealth={udoseHealth} />
      </Card.Body>
    </Card>
  );
};

export default BatterySolarVoltage;
