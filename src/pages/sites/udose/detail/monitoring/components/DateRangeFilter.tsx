import React, { Dispatch, SetStateAction } from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

type Props = {
  title?: string;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: any) => void;
  startDate: Date | null;
  endDate: Date | null;
  setDateRange: Dispatch<SetStateAction<[Date | null, Date | null]>>;
};

const DateRangeFilter: React.FC<Props> = ({
  title,
  handleSubmit,
  startDate,
  endDate,
  setDateRange,
}) => {
  return (
    <Row className="mb-3">
      <Col md={8}>
        <h5 className="text-primary-color">{title ?? ''}</h5>
      </Col>
      <Col md={4}>
        <span className="float-end">
          <form className="d-flex" onSubmit={handleSubmit}>
            <div className="input-group">
              <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                className="form-control block"
                selectsRange
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date()}
                placeholderText="Start Date - End Date"
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable
                showYearDropdown
                showMonthDropdown
              />
            </div>
            <button type="submit" className="btn btn-primary ms-2">
              <i className="mdi mdi-autorenew" />
            </button>
          </form>
        </span>
      </Col>
    </Row>
  );
};

export default DateRangeFilter;
