import React from 'react';
import { Card } from 'react-bootstrap';
import { UdoseRecordHour } from '../../../../../types/udose/udoseSummary';
import { prepareDynamicUrl } from '../../../../../helpers';
import { WATER_NUTRIENT_SUMMARY_BY_SITE } from '../../../../../constants/path';
import HeaderWithExternalLink from '../../../../../components/HeaderWithExternalLink';
import WaterNutrientAreaChart from './charts/WaterNutrientAreaChart';

type Props = {
  hourlyRecords: UdoseRecordHour[];
  id?: number;
};

const WaterNutrient: React.FC<Props> = ({ hourlyRecords, id }) => {
  return (
    <Card className="mt-2">
      <Card.Header>
        <HeaderWithExternalLink
          title="Hourly Water Nutrient Flow"
          linkPathname={prepareDynamicUrl(WATER_NUTRIENT_SUMMARY_BY_SITE, id)}
        />
      </Card.Header>
      <Card.Body className="p-0">
        <WaterNutrientAreaChart hourlyRecords={hourlyRecords} />
      </Card.Body>
    </Card>
  );
};

export default WaterNutrient;
