import React, { FC, forwardRef } from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';

const CustomDateInput = forwardRef(
  ({ onChange, value, onClick, className, placeholder }: any, ref: any) => (
    <div className="input-group">
      <input
        type="text"
        className={className}
        onClick={onClick}
        value={value}
        onChange={onChange}
        ref={ref}
        placeholder={placeholder || 'DD/MM/YYYY'}
      />
      <div className="input-group-append">
        <button type="button" className="input-group-text" onClick={onClick}>
          <i className="bx bx-calendar" />
        </button>
      </div>
    </div>
  )
);

type Props = {
  label: string;
  name: string;
  control: any;
  errors: any;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  defaultSelected: string | Date | undefined | null;
  showTimeSelectOnly?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
  placeholder?: string;
  timeIntervals?: number;
  isClearable?: boolean;
  isShowMonthDropdown?: boolean;
  isShowYearDropdown?: boolean;
};

const CustomDatePicker: FC<Props> = ({
  label,
  name,
  control,
  errors,
  minDate,
  maxDate,
  defaultSelected,
  showTimeSelectOnly,
  showTimeSelect,
  dateFormat,
  placeholder,
  timeIntervals,
  isClearable,
  isShowMonthDropdown,
  isShowYearDropdown,
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactDatePicker
            dateFormat={dateFormat || 'dd/MM/yyyy'}
            onChange={(date) => field.onChange(date)}
            selected={field.value ? field.value : defaultSelected}
            placeholderText={placeholder}
            customInput={<CustomDateInput />}
            className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
            minDate={minDate}
            maxDate={maxDate}
            showTimeSelectOnly={!!showTimeSelectOnly}
            showTimeSelect={!!showTimeSelect}
            timeIntervals={timeIntervals || 15}
            isClearable={isClearable}
            wrapperClassName="customized-datepicker"
            clearButtonClassName="text-gray"
            showMonthDropdown={isShowMonthDropdown}
            showYearDropdown={isShowYearDropdown}
          />
        )}
      />
      {errors && errors[name] ? (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {errors[name].message}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default CustomDatePicker;
