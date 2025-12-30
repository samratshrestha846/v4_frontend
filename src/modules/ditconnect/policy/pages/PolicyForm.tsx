import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import { PolicyFormProps } from '../types/Policy';
import usePolicyForm from '../hooks/usePolicyForm';

type Props = {
  defaultValues: PolicyFormProps;
};
const PolicyForm: React.FC<Props> = ({ defaultValues }) => {
  const modifiedDefaultValues = {
    ...defaultValues,
    file: null,
  };

  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
  } = usePolicyForm(modifiedDefaultValues);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Policy Title"
            type="text"
            name="title"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Policy File"
            type="file"
            name="file"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>

        {defaultValues.id && (
          <Col xl={6} lg={6} md={6}>
            <div className="mb-2">
              <Form.Label className="mb-1">Attached Policy File</Form.Label>
              <br />
              {defaultValues?.file_url ? (
                <a
                  href={defaultValues?.file_url}
                  target="_blank"
                  rel="noreferrer">
                  <i className="bx bxs-file-pdf me-1" />
                  View File
                </a>
              ) : (
                <strong>No file</strong>
              )}
            </div>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <div className="float-end button-list mt-2">
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default PolicyForm;
