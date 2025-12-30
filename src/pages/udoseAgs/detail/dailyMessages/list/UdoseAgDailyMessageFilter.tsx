/* eslint-disable no-unused-vars */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import DURATION_OPTIONS from '../../../../../constants/durationOptions';

type Props = {
  duration: null | string;
  handleChangeDuration: (e: any) => void;
};

const UdoseAgDailyMessageFilter: React.FC<Props> = ({
  duration,
  handleChangeDuration,
}) => {
  return (
    <Row>
      <Col md={4}>
        <Select
          name="duration"
          className="mb-2"
          value={DURATION_OPTIONS?.find((item) => item.value === duration)}
          options={DURATION_OPTIONS}
          isClearable
          onChange={handleChangeDuration}
        />
      </Col>
      <Col md={8} />
    </Row>
  );
};

export default UdoseAgDailyMessageFilter;
