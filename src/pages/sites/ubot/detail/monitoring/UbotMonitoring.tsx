import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import TankLevelMonitoring from './components/TankLevelMonitoring';
import UbotBatterySolarVoltage from './components/UbotBatterySolarVoltage';
import useFetchUbotRecordSummary from './hooks/useFetchUbotRecordSummary';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import DURATION_OPTIONS, {
  DURATION_LAST_7_DAYS,
} from '../../../../../constants/durationOptions';

const UbotMonitoring: React.FC = () => {
  const { data, isFetching, isError, duration, setDuration } =
    useFetchUbotRecordSummary();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Header className="mx-0">
        <Row className="justify-content-end">
          <Col md={8} sm={8} className="mb-2">
            <h5 className="text-primary-color">Monitoring</h5>
          </Col>
          <Col md={4} sm={4} className="mb-2">
            <Select
              value={DURATION_OPTIONS?.find((item) => item.value === duration)}
              options={DURATION_OPTIONS}
              onChange={(selected: any) =>
                setDuration(selected ? selected.value : DURATION_LAST_7_DAYS)
              }
              defaultValue={DURATION_OPTIONS.find(
                (item) => item.value === DURATION_LAST_7_DAYS
              )}
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {isFetching ? (
          <CustomLoader />
        ) : (
          <>
            <TankLevelMonitoring data={data} />
            <UbotBatterySolarVoltage data={data} />
          </>
        )}
      </Card.Body>
    </Card>
  );
};
export default UbotMonitoring;
