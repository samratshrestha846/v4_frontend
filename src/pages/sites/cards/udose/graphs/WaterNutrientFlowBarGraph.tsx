import React, { FC } from 'react';
import Chart from 'react-apexcharts';
import { Col, Row } from 'react-bootstrap';
import CustomLoader from '../../../../../components/CustomLoader';
import usePrepareWaterNutrientFlowGraphData from '../hooks/usePrepareWaterNutrientFlowGraphData';
import { UdoseRecordTwentyFourHour } from '../../../../../types/udose/udoseSummary';

type Props = {
  records?: UdoseRecordTwentyFourHour[] | [];
};

const WaterNutrientFlowBarGraph: FC<Props> = ({ records }) => {
  const { loading, chartOptions, chartSeries } =
    usePrepareWaterNutrientFlowGraphData(records);

  return (
    <Row>
      <Col>
        {loading ? (
          <CustomLoader />
        ) : (
          <Chart
            options={chartOptions}
            series={chartSeries}
            className="apex-charts"
            type="bar"
            height={350}
          />
        )}
      </Col>
    </Row>
  );
};

export default WaterNutrientFlowBarGraph;
