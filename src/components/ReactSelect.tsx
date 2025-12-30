/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import makeAnimated from 'react-select/animated';

type Props = {
  label?: string;
  errors: any;
  control: any;
  name: any;
  options: any[];
  defaultSelected?: any;
  isDisabled?: boolean;
  isMultiple?: boolean;
  propagateOnChange?: (e: any) => void;
  closeMenuOnSelect?: boolean;
  placeholder?: string;
  isClearable?: boolean;
  isOptionalField?: boolean;
  value?: any;
  isValidationFailed?: boolean;
};

const ReactSelect: React.FC<Props> = ({
  label,
  errors,
  control,
  name,
  options,
  defaultSelected,
  isDisabled,
  isMultiple,
  propagateOnChange,
  closeMenuOnSelect,
  placeholder,
  isClearable,
  isOptionalField,
  value,
  isValidationFailed,
}) => {
  const errorDiv = {
    div: {
      display: 'block',
    },
  };

  const errorStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '1px solid #fa5c7c',
    }),
  };
  const generalStyles = {
    option: (provided: any) => ({
      ...provided,
    }),
  };

  const animatedComponents = makeAnimated();

  return (
    <Form.Group>
      {label ? (
        <Form.Label>
          {label}
          {isOptionalField ? (
            <span className="text-optional fw-normal">{` (Optional) `}</span>
          ) : null}
        </Form.Label>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            value={value}
            defaultValue={defaultSelected}
            options={options}
            onChange={(e) => {
              onChange(e && !isMultiple ? e.value : e);
              propagateOnChange && propagateOnChange(e);
            }}
            components={animatedComponents}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isMulti={isMultiple}
            closeMenuOnSelect={closeMenuOnSelect}
            className="react-dropdown"
            classNamePrefix={` react-dropdown`}
            styles={
              (errors && errors[name]) || isValidationFailed
                ? errorStyles
                : generalStyles
            }
            placeholder={placeholder ?? 'Select'}
          />
        )}
      />
      {errors && errors[name] ? (
        <Form.Control.Feedback type="invalid" style={errorDiv.div}>
          {errors[name].message}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default ReactSelect;
