import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import FormInput from '@uhub/components/FormInput';
import { LabelValue } from '@uhub/types/common';
import GroupedSelectInput from './GroupedSelectInput';
import { DynamicFormConfig, FieldConfig } from '../types/dynamicForm';
import FormErrorMessage from './FormErrorMessageProps';

type DynamicFormRowProps = {
  formField: any;
  index: number;
  config: DynamicFormConfig;
  formKey: string;
  control: any;
  errors: any;
  register: any;
  colXl?: number;
  colLg?: number;
  colMd?: number;
  otherComponent?: React.ReactNode;
};

const checkIsHidden = (fieldConfig: FieldConfig, index: number): boolean => {
  if (typeof fieldConfig.isHidden === 'function') {
    return fieldConfig.isHidden(index);
  }
  return !!fieldConfig.isHidden;
};
const DynamicFormRow: React.FC<DynamicFormRowProps> = ({
  formField,
  index,
  config,
  formKey,
  control,
  errors,
  register,
  colXl = 4,
  colLg = 4,
  colMd = 6,
  otherComponent,
}) => {
  const getNestedError = (obj: any, path?: string) => {
    if (!path || typeof path !== 'string') return undefined;

    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  };

  const renderErrorMessage = (fieldConfig: FieldConfig) => {
    if (!fieldConfig?.name) {
      return null;
    }

    const fieldError = getNestedError(
      errors?.[formKey]?.[index],
      fieldConfig.name
    );

    return <FormErrorMessage error={fieldError} />;
  };
  const renderField = (fieldConfig: FieldConfig) => {
    if (fieldConfig.type === 'group-select' && fieldConfig.groupedOptions) {
      return (
        <Controller
          name={`${formKey}[${index}].${fieldConfig.name}`}
          control={control}
          defaultValue={
            fieldConfig.groupedOptions
              .flatMap((group: { options: any }) => group.options)
              .find((option: { id: any }) => option.id === fieldConfig.value) ||
            null
          }
          render={({ field }) => (
            <GroupedSelectInput
              options={fieldConfig.groupedOptions ?? []}
              value={
                fieldConfig
                  .groupedOptions!.flatMap(
                    (group: { options: any }) => group.options
                  )
                  .find((option: { id: any }) => option.id === field.value) ||
                null
              }
              placeholder={fieldConfig.placeholder ?? ''}
              onChange={(selected) => field.onChange(selected?.id || null)}
            />
          )}
        />
      );
    }

    if (fieldConfig.type === 'select') {
      const options =
        typeof fieldConfig.options === 'function'
          ? fieldConfig.options(index)
          : (fieldConfig.options ?? []);

      return (
        <Controller
          name={`${formKey}[${index}].${fieldConfig.name}`}
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <Select
              options={options}
              value={
                options.find(
                  (option: LabelValue) => option.value === field.value
                ) || null
              }
              placeholder={fieldConfig.placeholder ?? 'Select...'}
              onChange={(selected) => field.onChange(selected?.value)}
              isClearable
            />
          )}
        />
      );
    }

    return (
      <FormInput
        name={`${formKey}[${index}].${fieldConfig.name}`}
        type={fieldConfig.type}
        placeholder={fieldConfig.placeholder}
        register={register}
        errors={errors}
        step={fieldConfig.step}
        readOnly={fieldConfig.readOnly}
      />
    );
  };
  return (
    <Row key={formField.id}>
      {config.fields.map((fieldConfig) =>
        fieldConfig && !checkIsHidden(fieldConfig, index) ? (
          <Col
            key={fieldConfig.name}
            xl={colXl}
            lg={colLg}
            md={colMd}
            className="mb-3">
            <Form.Group>
              {fieldConfig.label ? (
                <Form.Label>{fieldConfig.label}</Form.Label>
              ) : null}
              {renderField(fieldConfig)}
              {renderErrorMessage(fieldConfig)}
            </Form.Group>
          </Col>
        ) : null
      )}
      {otherComponent}
    </Row>
  );
};

export default DynamicFormRow;
