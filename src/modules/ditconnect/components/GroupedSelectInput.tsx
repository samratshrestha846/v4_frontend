/* eslint-disable no-unused-vars */
import React from 'react';
import Select from 'react-select';
import { GroupedOption } from '../types/ditConnect';

interface GroupedSelectInputProps {
  options: GroupedOption<any>[];
  placeholder: string;
  value: any;
  defaultValue?: any;
  onChange: (selectedOption: { id: number; name: string } | null) => void;
  readOnly?: boolean;
}

const formatGroupLabel = (data: GroupedOption<any>) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>{data.label}</span>
    <span
      style={{
        backgroundColor: '#EBECF0',
        borderRadius: '2em',
        padding: '0.25em 0.75em',
      }}>
      {data.options.length}
    </span>
  </div>
);

const GroupedSelectInput: React.FC<GroupedSelectInputProps> = ({
  options,
  placeholder,
  defaultValue,
  value,
  onChange,
  readOnly = false,
}) => {
  const handleChange = (selectedOption: any) => {
    onChange(
      selectedOption
        ? { id: selectedOption.id, name: selectedOption.name }
        : null
    );
  };

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      marginLeft: '1rem',
    }),
    groupHeading: (provided: any) => ({
      ...provided,
      fontWeight: 'bold',
    }),
  };

  return (
    <Select
      options={options}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => String(option.id)}
      formatGroupLabel={formatGroupLabel}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      isClearable
      styles={customStyles}
      className="w-full"
      isDisabled={readOnly}
    />
  );
};

export default GroupedSelectInput;
