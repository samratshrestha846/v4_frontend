import React from 'react';
import { Card } from 'react-bootstrap';
import { UdoseRecordFourHour } from '../../../../../types/udose/udoseSummary';
import { prepareDynamicUrl } from '../../../../../helpers';
import { NUTRIENT_USAGE_SUMMARY_BY_SITE } from '../../../../../constants/path';
import HeaderWithExternalLink from '../../../../../components/HeaderWithExternalLink';
import NutrientUsageAreaChart from './charts/NutrientUsageAreaChart';

type Props = {
  fourHourlyRecords: UdoseRecordFourHour[];
  id?: number;
};

const NutrientUsage: React.FC<Props> = ({ fourHourlyRecords, id }) => {
  return (
    <Card className="mt-2">
      <Card.Header>
        <HeaderWithExternalLink
          title="Nutrient Tank Level"
          linkPathname={prepareDynamicUrl(NUTRIENT_USAGE_SUMMARY_BY_SITE, id)}
        />
      </Card.Header>
      <Card.Body className="p-0">
        <NutrientUsageAreaChart fourHourlyRecords={fourHourlyRecords} />
      </Card.Body>
    </Card>
  );
};

export default NutrientUsage;
