import React from 'react';
import { Card } from 'react-bootstrap';
import { UdoseRecordFourHour } from '../../../../../types/udose/udoseSummary';
import { prepareDynamicUrl } from '../../../../../helpers';
import { CONDUCTIVITY_SUMMARY_BY_SITE } from '../../../../../constants/path';
import HeaderWithExternalLink from '../../../../../components/HeaderWithExternalLink';
import ConductivityAreaChart from './charts/ConductivityAreaChart';
import { SiteSetting } from '../../../../../types/site';

type Props = {
  setting: SiteSetting;
  fourHourlyRecords: UdoseRecordFourHour[];
  id?: number;
};

const Conductivity: React.FC<Props> = ({ setting, fourHourlyRecords, id }) => {
  return (
    <Card>
      <Card.Header>
        <HeaderWithExternalLink
          title="Highest Lowest Conductivity"
          linkPathname={prepareDynamicUrl(CONDUCTIVITY_SUMMARY_BY_SITE, id)}
        />
      </Card.Header>
      <Card.Body className="p-0">
        <ConductivityAreaChart
          fourHourlyRecords={fourHourlyRecords}
          setting={setting}
        />
      </Card.Body>
    </Card>
  );
};

export default Conductivity;
