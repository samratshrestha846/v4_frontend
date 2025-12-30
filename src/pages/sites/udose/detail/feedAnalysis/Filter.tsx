/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { breakdownOptions, durationOptions } from './constants/FilterConstant';

type Props = {
  setBreakdownAs: Dispatch<SetStateAction<string>>;
  breakdownAs?: string;
  calculate: () => void;
  breakdownNumberLabel: string;
  breakdownNumber?: number;
  setBreakdownNumber: Dispatch<SetStateAction<number | undefined>>;
  duration?: string;
  setDuration: Dispatch<SetStateAction<string | undefined>>;
};

const Filter: React.FC<Props> = ({
  setBreakdownAs,
  breakdownAs,
  calculate,
  breakdownNumberLabel,
  breakdownNumber,
  setBreakdownNumber,
  duration,
  setDuration,
}) => {
  return (
    <Row>
      <Col sm={6} md={3} lg={3} className="mb-2">
        <Form.Label>Breakdown As</Form.Label>
        <Select
          defaultValue={breakdownOptions?.find(
            (val) => val.value === breakdownAs
          )}
          options={breakdownOptions}
          onChange={(e) => setBreakdownAs(e?.value ?? '')}
          className="react-dropdown"
          classNamePrefix="react-dropdown"
        />
      </Col>
      <Col sm={6} md={3} lg={3} className="mb-2">
        <Form.Label>{breakdownNumberLabel}</Form.Label>
        <input
          type="text"
          name="breakdown_number"
          placeholder={breakdownNumberLabel}
          key="name"
          defaultValue={breakdownNumber}
          onChange={(e) => setBreakdownNumber(Number(e.target.value))}
          className="form-control"
        />
      </Col>
      <Col sm={6} md={3} lg={3} className="mb-2">
        <Form.Label>Breakdown For</Form.Label>
        <Select
          defaultValue={durationOptions.find((val) => val.value === duration)}
          options={durationOptions}
          onChange={(e) => setDuration(e?.value)}
          className="react-dropdown"
          classNamePrefix="react-dropdown"
        />
      </Col>
      <Col sm={6} md={3} lg={3} className="mb-2">
        <div className="mt-3 pt-1">
          <Button
            variant="secondary"
            className="btn btn-secondary"
            type="submit"
            onClick={calculate}>
            <i className="bx bx-calculator me-1" />
            Calculate
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Filter;
