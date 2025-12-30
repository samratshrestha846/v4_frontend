import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import usePrepareCarbonCreditGraphData from '../hooks/usePrepareCarbonCreditGraphData';
import CustomLoader from '../../../../../../components/CustomLoader';
import { CarbonCreditSummary } from '../../../../../../types/udose/carbonAccounting';

type Props = {
  data: CarbonCreditSummary;
};

const CarbonCreditGraph: FC<Props> = ({ data }) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareCarbonCreditGraphData(data);

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

export default CarbonCreditGraph;
