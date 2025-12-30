import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import CustomLoader from '../../../../../../components/CustomLoader';
import { UbotSummaryRecord } from '../../../../../../types/ubot';
import usePrepareUbotBatterySolarVoltageData from '../hooks/usePrepareUbotBatterySolarVoltageData';

type Props = {
  data?: UbotSummaryRecord[];
};

const UbotBatterySolarVoltage: React.FC<Props> = ({ data }) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareUbotBatterySolarVoltageData(data);

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Battery Solar Voltage
      </Card.Header>
      <Card.Body className="p-0">
        {loading ? (
          <div className="d-flex justify-content-center">
            <CustomLoader />
          </div>
        ) : (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            className="apex-charts"
            height={400}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default UbotBatterySolarVoltage;
