import React from 'react';
import Chart from 'react-apexcharts';
import { Col, Row } from 'react-bootstrap';
import CustomLoader from '../../../components/CustomLoader';
import usePrepareWaterFertilizerGlowGraphData from '../hooks/usePrepareWaterFertilizerGlowGraphData';
import useFetchUdoseAgRunningVolumes from '../hooks/useFetchUdoseAgRunningVolumes';
import ErrorMessage from '../../../components/ErrorMessage';

type Props = {
  udoseAgId?: number;
  sessionId?: number;
};

const WaterFertilizerFlowBarChart: React.FC<Props> = ({
  udoseAgId,
  sessionId,
}) => {
  const {
    data: runningVolumes,
    isFetching: isFetchingRunningVolumes,
    isError: isErrorsRunningVolumes,
  } = useFetchUdoseAgRunningVolumes(udoseAgId, sessionId);

  const { loading, chartOptions, chartSeries } =
    usePrepareWaterFertilizerGlowGraphData(runningVolumes);

  if (isFetchingRunningVolumes || loading) {
    return <CustomLoader />;
  }

  if (isErrorsRunningVolumes) {
    return <ErrorMessage />;
  }

  return (
    <Row>
      <Col>
        {loading ? (
          <CustomLoader />
        ) : (
          <Chart
            options={chartOptions}
            series={chartSeries}
            className="apex-charts mb-3"
            type="bar"
            height={350}
          />
        )}
      </Col>
    </Row>
  );
};

export default WaterFertilizerFlowBarChart;
