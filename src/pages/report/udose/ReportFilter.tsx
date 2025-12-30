/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import ReactSelect from '../../../components/ReactSelect';
import { DOSING_MODE_OPTIONS } from '../../../constants/udoseSettings';
import ReportColumn from './ReportColumn';
import CustomDatePicker from '../../../components/CustomDatePicker';
import { ExportReportFormFields } from '../../../types/exportReport';
import { LabelNumericValue, LabelValueDropdown } from '../../../types/common';

type Props = {
  control: Control<ExportReportFormFields>;
  register: UseFormRegister<ExportReportFormFields>;
  errors: FieldErrors<ExportReportFormFields>;
  reportColumns: any[];
  customersDropdown: LabelNumericValue[];
  propertiesOptions: LabelNumericValue[];
  sitesOptions: LabelNumericValue[];
  supplementsOptions: LabelNumericValue[];
  serviceTypesOptions: LabelValueDropdown[];
  propagateOnCustomerChange: (selected: any) => void;
  propagateOnPropertyChange: (selected: any) => void;
};

const ReportFilter: React.FC<Props> = ({
  control,
  register,
  errors,
  reportColumns,
  customersDropdown,
  propertiesOptions,
  sitesOptions,
  supplementsOptions,
  serviceTypesOptions,
  propagateOnCustomerChange,
  propagateOnPropertyChange,
}) => {
  return (
    <Row>
      <Col md={9}>
        <Row>
          <Col sm={6} md={4} className="mb-2">
            <ReactSelect
              label="Customer"
              control={control}
              errors={errors}
              name="customer_id"
              options={customersDropdown}
              propagateOnChange={propagateOnCustomerChange}
            />
          </Col>
          <Col sm={6} md={4} className="mb-2">
            <ReactSelect
              label="Property"
              name="property_id"
              options={propertiesOptions}
              control={control}
              errors={errors}
              propagateOnChange={propagateOnPropertyChange}
            />
          </Col>
          <Col sm={6} md={4} className="mb-2">
            <ReactSelect
              label="Site"
              name="site_id"
              isMultiple={true}
              options={sitesOptions}
              errors={errors}
              control={control}
            />
          </Col>

          <Col sm={6} md={4} className="mb-2">
            <ReactSelect
              label="Supplement"
              name="supplement_id"
              options={supplementsOptions}
              errors={errors}
              control={control}
            />
          </Col>
          <Col sm={6} md={4} className="mb-2">
            <ReactSelect
              label="Service Type"
              name="credit_type"
              options={serviceTypesOptions}
              errors={errors}
              control={control}
            />
          </Col>
          <Col sm={6} md={4} className="mb-2">
            <ReactSelect
              label="Dosing Mode"
              name="dosing_mode"
              options={DOSING_MODE_OPTIONS}
              errors={errors}
              control={control}
            />
          </Col>
          <Col sm={6} md={4} className="mb-2">
            <CustomDatePicker
              label="Start Date"
              name="start_date"
              defaultSelected={undefined}
              maxDate={new Date()}
              control={control}
              errors={errors}
            />
          </Col>
          <Col sm={6} md={4} className="mb-2">
            <CustomDatePicker
              label="End Date"
              name="end_date"
              defaultSelected={new Date()}
              maxDate={new Date()}
              control={control}
              errors={errors}
            />
          </Col>
        </Row>
      </Col>
      <Col md={3}>
        <div className="border-2 border-left border-gray-300">
          <h5 className="mt-0 mb-1 p-2">Include Column</h5>
          <ReportColumn
            control={control}
            register={register}
            reportColumns={reportColumns}
          />
        </div>
      </Col>
      <Col md={12} className="d-flex justify-content-end">
        <Button variant="secondary" className="btn btn-secondary" type="submit">
          <i className="bx bx-export me-1" />
          Export Report
        </Button>
      </Col>
    </Row>
  );
};

export default ReportFilter;
