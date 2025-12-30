/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import DURATION_OPTIONS from '../../constants/durationOptions';
import { DEVICE_LOG_ACTION_OPTIONS } from '../../constants/constants';

type Props = {
  duration?: string;
  setDuration: Dispatch<SetStateAction<string | undefined>>;
  action?: string;
  setAction: Dispatch<SetStateAction<string | undefined>>;
};

const FilterDeviceLogs: React.FC<Props> = ({
  duration,
  setDuration,
  action,
  setAction,
}) => {
  return (
    <Row>
      <Col md={4} sm={6}>
        <Select
          className="mb-2"
          isClearable
          options={DURATION_OPTIONS}
          onChange={(selected) =>
            setDuration(selected ? selected.value : undefined)
          }
          placeholder="Duration"
          value={DURATION_OPTIONS?.find((item) => item.value === duration)}
        />
      </Col>
      <Col md={4} sm={6}>
        <Select
          className="mb-2"
          isClearable
          options={DEVICE_LOG_ACTION_OPTIONS}
          onChange={(selected) =>
            setAction(selected ? selected.value : undefined)
          }
          placeholder="Action"
          value={DEVICE_LOG_ACTION_OPTIONS?.find(
            (item) => item.value === action
          )}
        />
      </Col>
    </Row>
  );
};

export default FilterDeviceLogs;
