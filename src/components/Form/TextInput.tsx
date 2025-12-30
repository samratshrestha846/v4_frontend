/* eslint-disable no-unused-vars */

import React, { ChangeEvent, RefObject } from 'react';
import { Form } from 'react-bootstrap';

type TextInputProps = {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchRef?: RefObject<HTMLInputElement>;
};

const TextInput = ({
  label,
  placeholder,
  onChange,
  defaultValue,
  searchRef,
}: TextInputProps) => {
  return (
    <div>
      {label && <Form.Label>{label}</Form.Label>}
      <input
        ref={searchRef}
        type="text"
        className="form-control"
        onChange={onChange}
        placeholder={placeholder ?? 'Search'}
        defaultValue={defaultValue ?? ''}
      />
    </div>
  );
};

export default TextInput;
