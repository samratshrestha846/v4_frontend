/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormInput } from '../../../../components';
import ChooseLabResultModel from '../modal/ChooseLabResultModal';
import CustomDatePicker from '../../../../components/CustomDatePicker';
import ReactSelect from '../../../../components/ReactSelect';
import SelectedLabSampleList from '../components/SelectedLabSampleList';
import { LabSample } from '../../../../types/lab/labSampleList';
import { LabTestResultView } from '../../../../types/lab/labTestResult';
import { LabReportFormValues } from '../../../../types/lab/labReport';
import { LabelNumericValue } from '../../../../types/common';
import {
  LAB_SAMPLE_TYPE_PASTURE,
  LAB_SAMPLE_TYPE_WATER,
} from '../../../../constants/labConstants';
import CustomDataTable from '../../../../components/CustomDataTable';
import { ANIMAL_AND_GRASS_SPECS_TABLE_COLUMN } from '../constantas/labReportConstants';

type Props = {
  register: UseFormRegister<LabReportFormValues>;
  control: Control<LabReportFormValues>;
  errors: FieldErrors<LabReportFormValues>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleChangeOnLabSampleSelect: (selected: any) => void;
  selectedLabSamples: LabSample[];
  defaultTestResults: LabTestResultView[];
  loading: boolean;
  propertiesOptions: LabelNumericValue[];
  isExistingProperty: boolean;
  handleRemoveLabSample: (sampleId: number) => void;
  setIsExistingProperty: Dispatch<SetStateAction<boolean>>;
};

const LabReportForm: React.FC<Props> = ({
  register,
  control,
  errors,
  showModal,
  setShowModal,
  handleChangeOnLabSampleSelect,
  selectedLabSamples,
  defaultTestResults,
  loading,
  propertiesOptions,
  isExistingProperty,
  handleRemoveLabSample,
  setIsExistingProperty,
}) => {
  return (
    <>
      <Row>
        <Col md={12}>
          <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary">
            <i className="bx bx-user me-1" />
            Customer Details
          </h5>
        </Col>
        <Col sm={6} md={6} className="react-select-form mb-3">
          <FormInput
            type="checkbox"
            register={register}
            control={control}
            errors={errors}
            label="Does the customer property already exist?"
            name="is_existing_property"
            propagateOnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIsExistingProperty(e.target.checked)
            }
          />
        </Col>
        {isExistingProperty && (
          <Col sm={6} md={6} className="react-select-form mb-2">
            <ReactSelect
              control={control}
              errors={errors}
              label="Property"
              name="customer_property_id"
              options={propertiesOptions}
              isClearable
            />
          </Col>
        )}
      </Row>
      {!isExistingProperty && (
        <Row>
          <Col sm={6} md={6} className="mb-2">
            <FormInput
              label="Customer Name"
              type="text"
              name="customer"
              placeholder="Customer Name"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>
          <Col sm={6} md={6} className="mb-2">
            <FormInput
              label="Property Name"
              type="text"
              name="name"
              placeholder="Property Name"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>
          <Col sm={6} md={6} className="mb-2">
            <FormInput
              label="Contact Number"
              type="text"
              name="phone"
              placeholder="Contact Number"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>
          <Col sm={6} md={6} className="mb-2">
            <FormInput
              label="Email Address"
              type="text"
              name="email"
              placeholder="email"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col md={12}>
          <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary mt-2">
            <i className="bx bxs-report me-1" />
            Lab Report Details
          </h5>
        </Col>
        <Col sm={6} md={6} className="mb-2">
          <CustomDatePicker
            label="Date"
            name="report_date"
            defaultSelected={new Date()}
            maxDate={new Date()}
            control={control}
            errors={errors}
          />
        </Col>
        <Col sm={6} md={6} className="mb-2">
          <FormInput
            label="No. of Sample Received"
            type="text"
            name="no_of_sample_received"
            placeholder="No. of Sample Received"
            register={register}
            control={control}
            errors={errors}
          />
        </Col>
        <Col md={12} sm={12}>
          <FormInput
            label="Test Description"
            type="textarea"
            name="job_description"
            placeholder="Test description"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col md={12} sm={12}>
          <FormInput
            label="Sample Condition"
            type="textarea"
            name="sample_condition"
            placeholder="Sample Condition"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between mb-2 float-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowModal(true)}>
              <i className="bx bx-check-square me-1" />
              Select Lab Samples
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        {selectedLabSamples.length > 0 ? (
          <div className="mb-2">
            <SelectedLabSampleList
              selectedLabSamples={selectedLabSamples}
              handleRemoveLabSample={handleRemoveLabSample}
            />
          </div>
        ) : (
          <Col>
            <div
              className="d-flex justify-content-center align-items-center mb-2"
              style={{
                minHeight: '8rem',
                border: '1px solid #dee2e6',
                borderRadius: '5px',
              }}>
              <i className="bx bx-info-circle" />
              &nbsp;No Lab Test Results Found.
            </div>

            <FormInput
              type="hidden"
              name="lab_sample_ids[]"
              register={register}
              control={control}
              errors={errors}
            />
            {errors && errors.lab_sample_ids ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors?.lab_sample_ids?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
        )}
      </Row>

      {defaultTestResults
        ?.map((item) => item.grass_species || item.animal_specs)
        .some((element) => element) && (
        <Row>
          <Col>
            <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary mt-2">
              <i className="bx bxs-leaf me-1" />
              Animal and Grass Species
            </h5>
            <CustomDataTable
              columns={ANIMAL_AND_GRASS_SPECS_TABLE_COLUMN}
              data={defaultTestResults}
            />
          </Col>
        </Row>
      )}
      {selectedLabSamples && selectedLabSamples.length > 0 && (
        <Row>
          <Col md={12}>
            <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary mt-2">
              <i className="bx bxs-cog me-1" />
              Settings
            </h5>
          </Col>

          {selectedLabSamples?.[0]?.lab_sample_type?.name ===
            LAB_SAMPLE_TYPE_PASTURE && (
            <Col md={6} sm={12}>
              <FormInput
                label="Enable the supplement section in the lab report."
                type="checkbox"
                name="settings[show_supplement]"
                placeholder="Show Supplement"
                register={register}
                control={control}
                errors={errors}
                containerClass="mb-2"
              />
            </Col>
          )}

          {selectedLabSamples?.[0]?.lab_sample_type?.name ===
            LAB_SAMPLE_TYPE_WATER && (
            <Col md={6} sm={12}>
              <FormInput
                label="Enable Comprehensive Report"
                type="checkbox"
                name="settings[show_comprehensive_report]"
                placeholder="Show Comprehensive Report"
                register={register}
                control={control}
                errors={errors}
                containerClass="mb-2"
              />
            </Col>
          )}
        </Row>
      )}

      <Row>
        <Col md={12}>
          <FormInput
            label="Summary"
            type="textarea"
            name="summary"
            placeholder="Summary"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col md={12} sm={12}>
          <FormInput
            label="Enable the summary section in the lab report."
            type="checkbox"
            name="settings[show_summary]"
            placeholder="Show Summary"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col md={12}>
          <FormInput
            label="Recommendation"
            type="textarea"
            name="recommendation"
            placeholder="Recommendation"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col md={12} sm={12}>
          <FormInput
            label="Enable the recommendation section in the lab report."
            type="checkbox"
            name="settings[show_recommendation]"
            placeholder="Show Recommendation"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
      </Row>

      <ChooseLabResultModel
        showModal={showModal}
        setShowModal={setShowModal}
        handleChangeOnLabSampleSelect={handleChangeOnLabSampleSelect}
        selectedLabSamples={selectedLabSamples}
        loading={loading}
        propertiesOptions={propertiesOptions}
      />
    </>
  );
};

export default LabReportForm;
