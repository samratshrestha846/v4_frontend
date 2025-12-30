import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { TemplateFormProps } from '../types/Template';
import useTemplateForm from '../hooks/useTemplateForm';
import useInputFieldArray from '../hooks/useInputFieldArray';
import DynamicForm from '../../../components/DynamicForm';

type Props = {
  defaultValues: TemplateFormProps;
};
const TemplateForm: React.FC<Props> = ({ defaultValues }) => {
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
  } = useTemplateForm(defaultValues);
  const {
    formConfig: inputFieldFormConfig,
    isFetching: isInputFieldFetching,
    isError: isInputFieldError,
  } = useInputFieldArray(control);

  if (isInputFieldFetching) {
    return <CustomLoader />;
  }
  if (isInputFieldError) {
    return <ErrorMessage />;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Untitled Form"
            name="title"
            errors={errors}
            control={control}
            register={register}
            type="text"
            placeholder="Untitled Form"
          />
        </Col>
        <DynamicForm
          config={inputFieldFormConfig}
          control={control}
          errors={errors}
          formKey="inputFields"
          formTitle=""
          register={register}
          key="inputFields"
          formType="row"
        />
      </Row>

      <Row className="">
        <Col>
          <div className="float-end button-list">
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default TemplateForm;
