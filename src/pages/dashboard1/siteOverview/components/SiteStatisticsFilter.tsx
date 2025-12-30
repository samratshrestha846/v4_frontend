import React, { Dispatch, SetStateAction } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import ReactSelect from 'react-select';
import { LabelValueDropdown } from '../../../../types/common';

type Props = {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  creditType?: string;
  setCreditType: Dispatch<SetStateAction<string | undefined>>;
  creditTypeOptions?: LabelValueDropdown[];
};

const SiteStatisticsFilter: React.FC<Props> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  creditType,
  setCreditType,
  creditTypeOptions,
}) => {
  return (
    <Row>
      <Col sm={4}>
        <Form.Label>Start Date</Form.Label>
        <ReactDatePicker
          name="start_date"
          dateFormat="dd/MM/yyyy"
          className="form-control mb-2"
          maxDate={new Date()}
          placeholderText="Start Date"
          onChange={(update) => setStartDate(update)}
          selected={startDate}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      </Col>
      <Col sm={4}>
        <Form.Label>End Date</Form.Label>
        <ReactDatePicker
          name="end_date"
          dateFormat="dd/MM/yyyy"
          className="form-control mb-2"
          minDate={startDate}
          maxDate={new Date()}
          placeholderText="End Date"
          onChange={(update) => setEndDate(update)}
          selected={endDate}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      </Col>
      <Col sm={4}>
        <Form.Label>Credit Type</Form.Label>
        <ReactSelect
          name="credit_type"
          placeholder="Select Service Type"
          options={creditTypeOptions}
          className="mb-2"
          onChange={(item) => setCreditType(item ? item.value : undefined)}
          value={creditTypeOptions?.find(
            (item: any) => item?.value === creditType
          )}
          isClearable
        />
      </Col>
    </Row>
  );
};

export default SiteStatisticsFilter;
