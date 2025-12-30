import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import ReactSelect from '../../../../components/ReactSelect';
import CustomDatePicker from '../../../../components/CustomDatePicker';
import FileUploader from '../../../../components/FileUploader';

import { FormInput } from '../../../../components';
import { LabSampleFormValues } from '../../../../types/lab/labSampleList';
import { LabelNumericValue } from '../../../../types/common';

type Props = {
  register: UseFormRegister<LabSampleFormValues>;
  control: Control<LabSampleFormValues>;
  errors: FieldErrors<LabSampleFormValues>;
  labSampleTypeOptions: LabelNumericValue[];
  siteOptions: LabelNumericValue[];
  userOptions: LabelNumericValue[];
  setFileUploaded: Dispatch<SetStateAction<string | undefined>>;
};

const LabSampleForm: React.FC<Props> = ({
  register,
  control,
  errors,
  labSampleTypeOptions,
  siteOptions,
  userOptions,
  setFileUploaded,
}) => {
  return (
    <Row>
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
          label="Site Name"
          name="site_id"
          options={siteOptions}
        />
      </Col>
      <Col sm={6} md={4} className="react-select-form mb-2">
        <ReactSelect
          control={control}
          errors={errors}
          label="Sample Type"
          name="lab_sample_type_id"
          options={labSampleTypeOptions}
        />
      </Col>
      <Col sm={6} md={4} className="react-select-form mb-2">
        <ReactSelect
          control={control}
          errors={errors}
          label="Sample Taken By"
          name="sample_taken_by"
          options={userOptions}
        />
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <FormInput
          label="Sample Kind"
          type="text"
          name="sample_kind"
          placeholder="Sample Kind"
          register={register}
          control={control}
          errors={errors}
        />
      </Col>

      <Col sm={6} md={4} className="mb-2">
        <CustomDatePicker
          label="Sample Collected On"
          name="collected_datetime"
          control={control}
          errors={errors}
          defaultSelected={undefined}
        />
      </Col>

      <Col sm={6} md={4} className="mb-2">
        <CustomDatePicker
          label="Received On"
          name="received_datetime"
          control={control}
          errors={errors}
          defaultSelected={undefined}
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
          placeholder="Animal Specs"
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

      <Col sm={6} md={4}>
        <Form.Label className="mb-1">Drop/Upload PDF file</Form.Label>
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

      <Col sm={6} md={8} className="mb-2">
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
  );
};

export default LabSampleForm;
