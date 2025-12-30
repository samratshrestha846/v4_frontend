import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import CustomLoader from '../../../../components/CustomLoader';
import { CeresTagPFISummary } from '../../../../types/ceresTag/ceresTag';
import usePreparePFIDailySummaryLineGraphData from '../../hooks/usePreparePFIDailySummaryLineGraphData';

type Props = {
  data?: CeresTagPFISummary[];
};

const AnimalBehaviourLineGraph: React.FC<Props> = ({ data }) => {
  const { chartSeries, chartOptions, loading } =
    usePreparePFIDailySummaryLineGraphData(data);

  return loading ? (
    <CustomLoader />
  ) : (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Animal Behaviours
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

export default AnimalBehaviourLineGraph;
