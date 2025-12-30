import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import useFetchDailyPFISummaries from '../../hooks/useFetchDailyPFISummaries';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import AnimalBehaviourLineGraph from './AnimalBehaviourLineGraph';
import DryMatterConsumptionAndMethaneEmissionBarGraph from './DryMatterConsumptionAndMethaneEmissionBarGraph';
import {
  CERES_TAG_DURATION_OPTIONS,
  DURATION_LAST_24_HOURS,
} from '../../../../constants/durationOptions';

const PFISummary: React.FC = () => {
  const { isFetching, isError, data, duration, handleChangeDuration } =
    useFetchDailyPFISummaries();

  if (isError) return <ErrorMessage />;

  return (
    <>
      <Row className="justify-content-end">
        <Col md={8} />
        <Col md={4}>
          <Select
            name="duration"
            className="mb-2"
            value={CERES_TAG_DURATION_OPTIONS?.find(
              (item) => item.value === duration
            )}
            options={CERES_TAG_DURATION_OPTIONS}
            onChange={handleChangeDuration}
            defaultValue={CERES_TAG_DURATION_OPTIONS.find(
              (item) => item.value === DURATION_LAST_24_HOURS
            )}
          />
        </Col>
      </Row>
      {isFetching ? (
        <CustomLoader />
      ) : (
        <Row>
          <Col md={6}>
            <AnimalBehaviourLineGraph data={data} />
          </Col>
          <Col md={6}>
            <DryMatterConsumptionAndMethaneEmissionBarGraph data={data} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default PFISummary;
