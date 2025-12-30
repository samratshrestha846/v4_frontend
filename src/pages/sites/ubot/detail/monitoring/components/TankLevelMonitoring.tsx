import React from 'react';
import { Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { UbotSummaryRecord } from '../../../../../../types/ubot';
import usePrepareTankLevelGraphData from '../hooks/usePrepareTankLevelGraphData';
import CustomLoader from '../../../../../../components/CustomLoader';

type Props = {
  data?: UbotSummaryRecord[];
};

const TankLevelMonitoring: React.FC<Props> = ({ data }) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareTankLevelGraphData(data);

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Tank Level
      </Card.Header>
      <Card.Body>
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

export default TankLevelMonitoring;
