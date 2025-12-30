import React from 'react';

type Props = {
  name: string;
  label: string;
  defaultValue: any;
};

const Input: React.FC<Props> = ({ name, label, defaultValue }) => {
  return (
    <div className="mt-2">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        placeholder={label}
        className="form-control"
        type="text"
        id="setting_key"
        required
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
