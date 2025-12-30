/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
// @flow
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

type PasswordInputProps = {
  name: string;
  placeholder?: string;
  refCallback?: any;
  errors?: any;
  register?: any;
  className?: string;
  readOnly?: boolean;
};

/* Password Input */
const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder,
  refCallback,
  errors,
  register,
  className,
  readOnly,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup className="mb-0">
      <Form.Control
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        id={name}
        as="input"
        ref={(r: any) => {
          if (refCallback) refCallback(r);
        }}
        className={className}
        isInvalid={!!(errors && errors[name])}
        {...(register ? register(name) : {})}
        autoComplete={name}
        readOnly={!!readOnly}
      />
      <div
        className={classNames('input-group-text', 'input-group-password', {
          'show-password': showPassword,
        })}
        data-password={showPassword ? 'true' : 'false'}>
        <button
          type="button"
          className={classNames(
            'btn btn-sm btn-link password-eye p-0',
            showPassword ? 'eye-open' : 'eye-close'
          )}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      </div>
    </InputGroup>
  );
};

type FormInputProps = {
  label?: any;
  type?: string;
  name: string;
  placeholder?: string;
  control?: any;
  register?: any;
  errors?: any;
  className?: string;
  labelClassName?: string;
  containerClass?: string;
  refCallback?: any;
  children?: any;
  readOnly?: boolean;
  defaultChecked?: boolean;
  defaultValue?: any;
  id?: any;
  propagateOnChange?: any;
  multiple?: boolean;
  step?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  placeholder,
  register,
  control,
  errors,
  className,
  labelClassName,
  containerClass,
  refCallback,
  children,
  readOnly,
  defaultChecked,
  defaultValue,
  id,
  propagateOnChange,
  multiple,
  step,
  ...otherProps
}: FormInputProps) => {
  // handle input type
  const comp =
    type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input';

  return (
    <>
      {type === 'hidden' ? (
        <input
          type={type}
          name={name}
          {...(register ? register(name) : {})}
          {...otherProps}
          value={defaultValue}
        />
      ) : (
        <>
          {type === 'password' ? (
            <>
              <Form.Group className={containerClass}>
                {label ? (
                  <>
                    <Form.Label className={labelClassName}>{label}</Form.Label>
                    {children}
                  </>
                ) : null}
                <PasswordInput
                  name={name}
                  placeholder={placeholder}
                  refCallback={refCallback}
                  errors={errors}
                  register={register}
                  className={className}
                  readOnly={readOnly}
                />

                {errors && errors[name] ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors[name].message}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </>
          ) : (
            <>
              {type === 'checkbox' || type === 'radio' ? (
                <>
                  <Form.Group className={containerClass}>
                    <Form.Check
                      type={type}
                      label={label}
                      name={name}
                      id={id || name}
                      ref={(r: any) => {
                        if (refCallback) refCallback(r);
                      }}
                      className={className}
                      isInvalid={!!(errors && errors[name])}
                      {...(register ? register(name) : {})}
                      {...otherProps}
                      defaultChecked={defaultChecked}
                      defaultValue={defaultValue}
                      onChange={propagateOnChange || (() => {})}
                    />

                    {errors && errors[name] ? (
                      <Form.Control.Feedback type="invalid">
                        {errors[name].message}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </>
              ) : (
                <Form.Group className={containerClass}>
                  {label ? (
                    <Form.Label className={labelClassName}>{label}</Form.Label>
                  ) : null}

                  <Form.Control
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    as={comp}
                    ref={(r: any) => {
                      if (refCallback) refCallback(r);
                    }}
                    className={classNames(
                      className,
                      readOnly ? 'is-read-only' : ''
                    )}
                    isInvalid={!!(errors && errors[name])}
                    {...(register ? register(name) : {})}
                    {...otherProps}
                    autoComplete={name}
                    readOnly={!!readOnly}
                    defaultValue={defaultValue}
                    multiple={type === 'file' && multiple}
                    step={step}>
                    {children || null}
                  </Form.Control>

                  {errors && errors[name] ? (
                    <Form.Control.Feedback type="invalid">
                      {errors[name].message}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default FormInput;
