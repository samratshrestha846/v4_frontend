import React from 'react';
import Select from 'react-select';

type Props = {
  name: string;
  options: any[];
  label: string;
  defaultValue: any;
};

const SelectDropdown: React.FC<Props> = ({
  name,
  options,
  label,
  defaultValue,
}) => {
  return (
    <div className="mt-2">
      <label htmlFor={name}>{label}</label>
      <Select name={name} options={options} defaultValue={defaultValue} />
    </div>
  );
};

export default SelectDropdown;
