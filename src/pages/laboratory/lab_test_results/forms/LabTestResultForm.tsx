/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import ReactSelect from '../../../../components/ReactSelect';
import LabTestParamsForm from './LabTestParamsForm';
import CustomDatePicker from '../../../../components/CustomDatePicker';

const LabTestResultForm = ({
  register,
  control,
  errors,
  userOptions,
  testParams,
  navigateToLabSamplesList,
  submitted,
}: any) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Row className="mb-2">
            <Col md={6} className="react-select-form">
              <ReactSelect
                control={control}
                errors={errors}
                label="Analysed By"
                name="analysed_by"
                options={userOptions}
              />
            </Col>
            <Col md={6}>
              <CustomDatePicker
                label="Analysed On"
                name="analysed_date_time"
                control={control}
                errors={errors}
                defaultSelected={undefined}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <LabTestParamsForm
        testParams={testParams}
        register={register}
        control={control}
        errors={errors}
        navigateToLabSamplesList={navigateToLabSamplesList}
        submitted={submitted}
      />
    </>
  );
};

export default LabTestResultForm;
