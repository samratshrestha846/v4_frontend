import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import CreatableSelect from 'react-select/creatable';
import ReactSelect from '@uhub/components/ReactSelect';
import { FormInput } from '@uhub/components';
import { Controller } from 'react-hook-form';
import {
  ResponseSetFormProps,
  responseSetTypeOptions,
} from '../types/ResponseSet';
import useResponseSetForm from '../hooks/useResponseSetForm';

type Props = {
  defaultValues: ResponseSetFormProps;
};
const ResponseSetForm: React.FC<Props> = ({ defaultValues }) => {
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
  } = useResponseSetForm(defaultValues);
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
            label="Response Set Name"
            type="text"
            name="name"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Type"
              name="type"
              errors={errors}
              control={control}
              options={responseSetTypeOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={responseSetTypeOptions?.find(
                (item) => item.value === defaultValues?.type
              )}
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <Controller
              name="items"
              control={control}
              render={({
                field: { value, onChange, onBlur, ref },
                fieldState: { error },
              }) => (
                <div className="mb-2">
                  <Form.Label>Items</Form.Label>
                  <CreatableSelect
                    inputRef={ref}
                    value={
                      value?.map((item) => ({ value: item, label: item })) || []
                    }
                    onChange={(selected) =>
                      onChange(selected?.map((option) => option.value))
                    }
                    onBlur={onBlur}
                    isClearable
                    isMulti
                  />

                  {error && (
                    <div className="text-danger font-12">{error.message}</div>
                  )}
                </div>
              )}
            />
          </div>
        </Col>
      </Row>

      <Row>
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

export default ResponseSetForm;
