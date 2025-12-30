/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import ReactSelect from '../../../../components/ReactSelect';
import { FormInput } from '../../../../components';
import CustomDatePicker from '../../../../components/CustomDatePicker';
import FileUploader from '../../../../components/FileUploader';
import {
  LabSample,
  LabSampleFormValues,
} from '../../../../types/lab/labSampleList';
import {
  LabelNumericValue,
  LabelValueDropdown,
} from '../../../../types/common';

type Props = {
  register: UseFormRegister<LabSampleFormValues>;
  control: Control<LabSampleFormValues>;
  errors: FieldErrors<LabSampleFormValues>;
  labSample?: LabSample;
  userOptions: LabelNumericValue[];
  labSampleTypeOptions: LabelNumericValue[];
  labTestTypeOptions?: LabelValueDropdown[];
  siteOptions: LabelNumericValue[];
  setFileUploaded: Dispatch<SetStateAction<string | undefined>>;
  propagateOnLabSampleTypeChange: (selected: any) => void;
  propagateOnTestTypeChange: (selected: any) => void;
  testType?: string;
  labSampleType?: LabelNumericValue;
  propertiesOptions: LabelNumericValue[];
  propagateOnCustomerPeropertyChange: (selected: any) => void;
  customerPropertyId?: number;
};

const EditLabSampleForm: React.FC<Props> = ({
  register,
  control,
  errors,
  labSample,
  userOptions,
  labSampleTypeOptions,
  labTestTypeOptions,
  siteOptions,
  setFileUploaded,
  propagateOnLabSampleTypeChange,
  propagateOnTestTypeChange,
  testType,
  labSampleType,
  propertiesOptions,
  propagateOnCustomerPeropertyChange,
  customerPropertyId,
}) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm={6} md={4} className="react-select-form mb-2">
            <ReactSelect
              name="customer_property_id"
              label="Customer Property"
              errors={errors}
              control={control}
              options={propertiesOptions}
              defaultSelected={propertiesOptions?.find(
                (val) => val.value === customerPropertyId
              )}
              propagateOnChange={propagateOnCustomerPeropertyChange}
              isClearable
            />
          </Col>
          <Col sm={6} md={4} className="react-select-form mb-2">
            <ReactSelect
              name="site_id"
              label="Site"
              errors={errors}
              control={control}
              options={siteOptions}
              defaultSelected={siteOptions?.find(
                (val) => val.value === labSample?.site?.id
              )}
              isClearable
            />
          </Col>
          <Col sm={6} md={4} className="mb-2">
            <FormInput
              label="Sample ID"
              type="text"
              name="sample_id"
              placeholder="Sample ID"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>

          <Col sm={6} md={4} className="react-select-form mb-2">
            <ReactSelect
              control={control}
              errors={errors}
              label="Sample Type"
              name="lab_sample_type_id"
              options={labSampleTypeOptions}
              defaultSelected={labSampleTypeOptions?.find(
                (val) => val.value === labSampleType?.value
              )}
              propagateOnChange={propagateOnLabSampleTypeChange}
            />
          </Col>

          {labTestTypeOptions && labTestTypeOptions.length > 0 && (
            <Col sm={6} md={4} className="react-select-form mb-2">
              <ReactSelect
                control={control}
                errors={errors}
                label="Test Type"
                name="test_type"
                options={labTestTypeOptions ?? []}
                defaultSelected={labTestTypeOptions?.find(
                  (val) => val.value === testType
                )}
                propagateOnChange={propagateOnTestTypeChange}
                isClearable
              />
            </Col>
          )}

          <Col sm={6} md={4} className="mb-2">
            <FormInput
              label="Sample Kind"
              type="text"
              name="sample_kind"
              placeholder="Sample Kind ..."
              register={register}
              control={control}
              errors={errors}
            />
          </Col>
          <Col sm={6} md={4} className="react-select-form mb-2">
            <ReactSelect
              label="Sample Taken By"
              name="sample_taken_by"
              control={control}
              errors={errors}
              options={userOptions}
              defaultSelected={userOptions?.find(
                (val) => val.value === labSample?.sample_taken_by?.id
              )}
            />
          </Col>

          <Col sm={6} md={4} className="mb-2">
            <CustomDatePicker
              label="Collected On"
              name="collected_datetime"
              control={control}
              errors={errors}
              defaultSelected={
                labSample ? new Date(labSample.collected_datetime) : undefined
              }
            />
          </Col>

          <Col sm={6} md={4} className="mb-2">
            <CustomDatePicker
              label="Received On"
              name="received_datetime"
              control={control}
              errors={errors}
              defaultSelected={
                labSample ? new Date(labSample.received_datetime) : undefined
              }
            />
          </Col>

          <Col sm={6} md={4} className="mb-2">
            <FormInput
              label="Latitude"
              type="text"
              name="latitude"
              placeholder="Latitude"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>

          <Col sm={6} md={4} className="mb-2">
            <FormInput
              label="Longitude"
              type="text"
              name="longitude"
              placeholder="Longitude"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>
          <Col sm={6} md={4} className="mb-2">
            <FormInput
              label="Paddock"
              type="text"
              name="paddock"
              placeholder="Paddock"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>
          <Col sm={6} md={4} className="mb-2">
            <FormInput
              label="Grass Species"
              type="text"
              name="grass_species"
              placeholder="Grass Species"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>

          <Col sm={6} md={4} className="mb-2">
            <FormInput
              label="Animal Specs"
              type="text"
              name="animal_specs"
              placeholder="Animal Specs ..."
              register={register}
              control={control}
              errors={errors}
            />
          </Col>

          <Col sm={6} md={4} className="mb-2">
            <div className="mb-2">
              <label className="mb-1">Attached file</label>
              <br />
              {labSample?.file_url ? (
                <a href={labSample?.file_url} target="_blank" rel="noreferrer">
                  <i className="bx bxs-file-pdf me-1" />
                  View File
                </a>
              ) : (
                <strong>No file</strong>
              )}
            </div>
          </Col>

          <Col sm={6} md={4}>
            <label htmlFor="file-upload" className="mb-1">
              Drop/Upload PDF file
            </label>
            <FileUploader
              onFileUpload={(files) => {
                setFileUploaded(files[0]);
              }}
            />
            {errors && errors?.file && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors?.file?.message}
              </Form.Control.Feedback>
            )}
          </Col>
          <Col className="mb-2">
            <FormInput
              label="Comments"
              type="textarea"
              name="comments"
              placeholder="Comments"
              register={register}
              control={control}
              errors={errors}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EditLabSampleForm;
