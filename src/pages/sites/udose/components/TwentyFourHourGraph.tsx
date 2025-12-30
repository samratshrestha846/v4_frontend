import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import ReactSelect from 'react-select';
import DURATION_OPTIONS from '../../../../constants/durationOptions';
import usePrepareTwentyFourHourGraphData from '../hooks/usePrepareTwentyFourHourGraphData';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import AvergaeFlow from '../../cards/udose/widgets/AverageFlow';
import useCalculateAverageFlow from '../../cards/udose/hooks/useCalculateAverageFlow';

const TwentyFourHourGraph: React.FC = () => {
  const {
    data,
    loading,
    chartSeries,
    chartOptions,
    duration,
    handleChangeDuration,
    isFetching,
    isError,
    siteDetail,
  } = usePrepareTwentyFourHourGraphData();

  const {
    loading: isCalculatingAverage,
    averageWaterFlow,
    averageNutrientFlow,
  } = useCalculateAverageFlow(data);

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Row>
        <Col md={6} />
        <Col md={6}>
          <ReactSelect
            name="duration"
            options={DURATION_OPTIONS}
            onChange={handleChangeDuration}
            defaultValue={DURATION_OPTIONS.find(
              (item) => item.value === duration
            )}
            className="mb-2"
          />
        </Col>
      </Row>

      {loading || isFetching || isCalculatingAverage ? (
        <CustomLoader />
      ) : (
        <>
          <AvergaeFlow
            averageNutrientFlow={averageNutrientFlow}
            averageWaterFlow={averageWaterFlow}
            showDurationLabel={false}
            waterFlowCheck={siteDetail?.water_flow_check}
            duration={duration}
          />
          <Chart
            options={chartOptions}
            series={chartSeries}
            className="apex-charts mt-3"
            type="bar"
            height={300}
          />
        </>
      )}
    </>
  );
};

export default TwentyFourHourGraph;
