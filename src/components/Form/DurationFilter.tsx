/* eslint-disable no-unused-vars */
import React from 'react';
import Select from 'react-select';

type Props = {
  duration?: string;
  handleChangeDuration: (e: any) => void;
  className?: string;
  options?: any[] | [];
  fieldWidth?: string;
  placeholder?: string;
};

const DurationFilter: React.FC<Props> = ({
  duration,
  handleChangeDuration,
  options,
  className,
  fieldWidth,
  placeholder,
}) => {
  const customStyles = {
    container: (base: any) => ({
      ...base,
      width: fieldWidth || '12rem',
      minWidth: '6rem',
    }),
  };
  return (
    <Select
      name="duration"
      className={className || 'mb-2'}
      styles={customStyles}
      defaultValue={options?.find((item) => item.value === duration)}
      options={options}
      onChange={handleChangeDuration}
      placeholder={placeholder || 'Duration'}
      isClearable
    />
  );
};

export default DurationFilter;
