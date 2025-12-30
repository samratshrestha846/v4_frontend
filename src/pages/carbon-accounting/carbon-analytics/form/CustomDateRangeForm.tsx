import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Control, FieldErrors } from 'react-hook-form';
import CustomDatePicker from '../../../../components/CustomDatePicker';

import { CustomDateRange } from '../../../../types/common';

type Props = {
  control: Control<CustomDateRange>;
  errors: FieldErrors<CustomDateRange>;
  toggleDropdown: () => void;
};

const CustomDateRangeForm: React.FC<Props> = ({
  control,
  errors,
  toggleDropdown,
}) => {
  return (
    <>
      <Row>
        <Col md={12}>
          <div className="mb-2">
            <CustomDatePicker
              control={control}
              errors={errors}
              name="from_date"
              label="From Date"
              defaultSelected={undefined}
              placeholder="DD/MM/YYYY"
              isClearable
              isShowMonthDropdown
              maxDate={new Date()}
            />
          </div>
        </Col>
        <Col md={12}>
          <div className="mb-2">
            <CustomDatePicker
              control={control}
              errors={errors}
              name="to_date"
              label="To Date"
              defaultSelected={new Date()}
              placeholder="DD/MM/YYYY"
              isShowMonthDropdown
              maxDate={new Date()}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="button-list float-end">
            <Button
              variant="outline"
              className="btn btn-ghost btn-sm"
              onClick={toggleDropdown}>
              <i className="bx bx-x me-1" /> Cancel
            </Button>
            <Button variant="secondary" type="submit" className="btn-sm">
              <i className="bx bx-filter-alt me-1" /> Filter
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CustomDateRangeForm;
