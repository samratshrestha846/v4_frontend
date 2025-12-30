import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import DURATION_OPTIONS, {
  DURATION_LAST_7_DAYS,
  RAINFALL_FILTER_TYPE_CUMULATIVE,
  RAINFALL_FILTER_TYPE_OPTIONS,
} from '../../../../../constants/durationOptions';
import useFetchUbotRainfallData from './hooks/useFetchUbotRainfallData';
import ErrorMessage from '../../../../../components/ErrorMessage';
import UbotRainfallChart from './UbotRainfallChart';

const UbotRainfall: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    duration,
    setDuration,
    rainfallFilterType,
    setRainfallFilterType,
  } = useFetchUbotRainfallData();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Header className="mx-0">
        <Row className="justify-content-end">
          <Col md={6} sm={4} className="mb-2">
            <h5 className="text-primary-color">Rainfall</h5>
          </Col>
          <Col md={3} sm={4} className="mb-2">
            <Select
              value={RAINFALL_FILTER_TYPE_OPTIONS?.find(
                (item) => item.value === rainfallFilterType
              )}
              options={RAINFALL_FILTER_TYPE_OPTIONS}
              onChange={(selected: any) =>
                setRainfallFilterType(
                  selected ? selected.value : RAINFALL_FILTER_TYPE_CUMULATIVE
                )
              }
              defaultValue={RAINFALL_FILTER_TYPE_OPTIONS.find(
                (item) => item.value === RAINFALL_FILTER_TYPE_CUMULATIVE
              )}
              placeholder="Select Type"
            />
          </Col>
          <Col md={3} sm={4} className="mb-2">
            <Select
              value={DURATION_OPTIONS?.find((item) => item.value === duration)}
              options={DURATION_OPTIONS}
              onChange={(selected: any) =>
                setDuration(selected ? selected.value : DURATION_LAST_7_DAYS)
              }
              defaultValue={DURATION_OPTIONS.find(
                (item) => item.value === DURATION_LAST_7_DAYS
              )}
              placeholder="Select Duration"
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <UbotRainfallChart
          data={data}
          rainfallFilterType={rainfallFilterType}
          isFetching={isFetching}
        />
      </Card.Body>
    </Card>
  );
};

export default UbotRainfall;
