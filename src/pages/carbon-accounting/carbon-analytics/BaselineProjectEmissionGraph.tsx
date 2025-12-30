import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { CarbonEmissionReductionSummary } from '../../../types/carbon-accounting/carbonAccounting';
import usePrepareBaselineProjectEmisionGraphData from './hooks/usePrepareBaselineProjectEmisionGraphData';
import CustomLoader from '../../../components/CustomLoader';

type Props = {
  data: CarbonEmissionReductionSummary;
  duration: string;
};

const BaselineProjectEmissionGraph: React.FC<Props> = ({ data, duration }) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareBaselineProjectEmisionGraphData(data, duration);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <Row>
      <Col>
        <Chart
          options={chartOptions}
          series={chartSeries}
          className="apex-charts"
          type="bar"
          height={400}
        />
      </Col>
    </Row>
  );
};

export default BaselineProjectEmissionGraph;
