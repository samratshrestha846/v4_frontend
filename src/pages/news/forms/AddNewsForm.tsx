/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../components';
import CustomDatePicker from '../../../components/CustomDatePicker';
import FileUploader from '../../../components/FileUploader';
import ReactSelect from '../../../components/ReactSelect';

import { NewsFormFields } from '../../../types/news';
import { LabelNumericValue } from '../../../types/common';

type Props = {
  register: UseFormRegister<NewsFormFields>;
  control: Control<NewsFormFields>;
  errors: FieldErrors<NewsFormFields>;
  setFileUploaded: Dispatch<SetStateAction<string | undefined>>;
  newsStatusOptions: LabelNumericValue[];
};

const AddNewsForm: React.FC<Props> = ({
  register,
  control,
  errors,
  setFileUploaded,
  newsStatusOptions,
}) => {
  return (
    <Row>
      <Col md={12} className="mb-3">
        <FormInput
          label="Title"
          type="text"
          name="title"
          placeholder="Title"
          register={register}
          control={control}
          errors={errors}
        />
      </Col>
      <Col md={12} className="mb-3">
        <FormInput
          label="Content"
          type="textarea"
          name="content"
          placeholder="Content"
          register={register}
          control={control}
          errors={errors}
        />
      </Col>

      <Col md={4} className="react-select-form mb-3">
        <ReactSelect
          control={control}
          errors={errors}
          label="Is Published ?"
          name="is_published"
          options={newsStatusOptions}
        />
      </Col>

      <Col md={4} className="md-2">
        <CustomDatePicker
          label="Published On"
          name="published_on"
          control={control}
          errors={errors}
          defaultSelected={undefined}
        />
      </Col>

      <Col md={4} className="mb-3">
        <FormInput
          label="Url Link"
          type="text"
          name="url_link"
          placeholder="Url link"
          register={register}
          control={control}
          errors={errors}
        />
      </Col>

      <Col md={4}>
        <Form.Label className="mb-1">Drop/Upload Image file</Form.Label>
        <FileUploader
          onFileUpload={(files) => {
            setFileUploaded(files[0]);
          }}
        />
        {errors && errors?.image && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors?.image?.message}
          </Form.Control.Feedback>
        )}
      </Col>
    </Row>
  );
};

export default AddNewsForm;
