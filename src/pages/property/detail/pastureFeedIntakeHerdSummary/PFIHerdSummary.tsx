import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import {
  CERES_TAG_DURATION_OPTIONS,
  DURATION_LAST_24_HOURS,
} from '../../../../constants/durationOptions';
import useFetchDailyPFIHerdSummaries from './hooks/useFetchDailyPFIHerdSummaries';
import AnimalBehaviourLineGraph from '../../../ceresTag/detail/pastureFeedIntakeSummary/AnimalBehaviourLineGraph';
import DryMatterConsumptionAndMethaneEmissionBarGraph from '../../../ceresTag/detail/pastureFeedIntakeSummary/DryMatterConsumptionAndMethaneEmissionBarGraph';

const PFIHerdSummary: React.FC = () => {
  const { isFetching, isError, data, duration, handleChangeDuration } =
    useFetchDailyPFIHerdSummaries();

  if (isError) return <ErrorMessage />;

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col md={8}>
            <h5 className="mt-1 text-primary-color">
              Herd Pasture Feed Intake Summary (Ceres Tags)
            </h5>
          </Col>
          <Col md={4}>
            <Select
              name="duration"
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
      </Card.Header>
      <Card.Body>
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
      </Card.Body>
    </Card>
  );
};

export default PFIHerdSummary;
