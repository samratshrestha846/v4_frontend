/* eslint-disable no-unused-vars */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import {
  CERES_TAG_DURATION_OPTIONS,
  DURATION_LAST_24_HOURS,
} from '../../../../constants/durationOptions';

type Props = {
  duration: string;
  handleChangeDuration: (e: any) => void;
};

const FilterAlerts: React.FC<Props> = ({ duration, handleChangeDuration }) => {
  return (
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
  );
};

export default FilterAlerts;
