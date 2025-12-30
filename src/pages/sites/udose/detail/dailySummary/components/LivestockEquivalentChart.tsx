import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { UdoseDailySummaryRecord } from '../../../../../../types/udose/udoseSummary';
import usePrepareLivestockEquivalentChartData from '../hooks/usePrepareLivestockEquivalentChartData';
import CustomLoader from '../../../../../../components/CustomLoader';

type Props = {
  dailyRecords?: UdoseDailySummaryRecord[];
};

const LivestockEquivalentChart: React.FC<Props> = ({ dailyRecords }) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareLivestockEquivalentChartData(dailyRecords);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Number of Livestock Equivalent
      </Card.Header>
      <Card.Body>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          className="apex-charts"
          height={400}
        />
      </Card.Body>
    </Card>
  );
};

export default LivestockEquivalentChart;
