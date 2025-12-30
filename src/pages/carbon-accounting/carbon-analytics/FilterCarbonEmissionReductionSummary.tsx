/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { Row, Col, ButtonGroup, Button, Dropdown, Form } from 'react-bootstrap';
import moment from 'moment';
import { CustomDateRange, LabelNumericValue } from '../../../types/common';
import {
  CC_DURATION_CUSTOM_DATE,
  CC_DURATION_MONTH_OPTIONS,
} from '../../../constants/durationOptions';
import CustomDateRangeForm from './form/CustomDateRangeForm';
import useToggleDropdown from '../../../hooks/common/useToggleDropdown';
import useCustomDateRange from './hooks/useCustomDateRange';
import { prepareDateRangeFilterParams } from '../../../helpers/filterHelper';

type Props = {
  customer?: number;
  setCustomer: Dispatch<SetStateAction<number | undefined>>;
  property?: number;
  setProperty: Dispatch<SetStateAction<number | undefined>>;
  site?: number;
  setSite: Dispatch<SetStateAction<number | undefined>>;
  duration?: string;
  setDuration: React.Dispatch<SetStateAction<string>>;
  setCustomDateRange: React.Dispatch<SetStateAction<CustomDateRange>>;
  customersOptions: LabelNumericValue[];
  propertiesOptions: LabelNumericValue[];
  sitesOptions: LabelNumericValue[];
};

const FilterCarbonEmissionReductionSummary: React.FC<Props> = ({
  customer,
  setCustomer,
  property,
  setProperty,
  site,
  setSite,
  duration,
  setDuration,
  setCustomDateRange,
  customersOptions,
  propertiesOptions,
  sitesOptions,
}) => {
  const { showDropdown, toggleDropdown } = useToggleDropdown();

  const { control, errors, handleSubmit, onSubmit } = useCustomDateRange({
    setCustomDateRange,
    toggleDropdown,
  });

  const handleDurationChange = (option: string) => {
    setDuration(option);
    if (option === CC_DURATION_CUSTOM_DATE) {
      toggleDropdown();
    } else {
      const { as_of_date_from: dateFrom, as_of_date_to: dateTo } =
        prepareDateRangeFilterParams(CC_DURATION_MONTH_OPTIONS[option].value);
      setCustomDateRange({
        from_date: moment(dateFrom).toDate(),
        to_date: moment(dateTo).toDate(),
      });
    }
  };

  return (
    <Row className="g-1 carbon-credit-filters">
      <Col md={2} sm={6}>
        <Select
          className="mb-3"
          options={customersOptions}
          onChange={(selected) => setCustomer(selected?.value)}
          placeholder="Customer"
          defaultValue={customersOptions.find(
            (item) => item.value === customer
          )}
          isClearable
        />
      </Col>
      <Col md={2} sm={6}>
        <Select
          className="mb-3"
          options={propertiesOptions}
          onChange={(selected) => setProperty(selected?.value)}
          placeholder="Property"
          defaultValue={propertiesOptions.find(
            (item) => item.value === property
          )}
          isClearable
        />
      </Col>

      <Col md={2} sm={6}>
        <Select
          className="mb-3"
          options={sitesOptions}
          onChange={(selected) => setSite(selected?.value)}
          placeholder="Site"
          defaultValue={sitesOptions?.find((item) => item.value === site)}
          isClearable
        />
      </Col>
      <Col md={6} sm={6}>
        <ButtonGroup className="mb-3 me-1 carbon-credit-duration-filter">
          {Object.keys(CC_DURATION_MONTH_OPTIONS).map((item) =>
            CC_DURATION_MONTH_OPTIONS[item].value ===
            CC_DURATION_CUSTOM_DATE ? (
              <Dropdown
                key={item}
                onToggle={() => handleDurationChange(item)}
                show={showDropdown}>
                <Dropdown.Toggle
                  variant="light"
                  className={classNames(
                    'duration-option-btn',
                    item === duration ? 'text-white active-duration' : ''
                  )}>
                  <i
                    className={classNames(
                      'bx bx-calendar me-1',
                      item === duration
                        ? 'text-white active-duration'
                        : 'text-muted'
                    )}
                  />
                  Custom Date
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: '15rem' }}>
                  <div className="m-2">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <CustomDateRangeForm
                        control={control}
                        errors={errors}
                        toggleDropdown={toggleDropdown}
                      />
                    </Form>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                key={item}
                variant="light"
                className={classNames(
                  'duration-option-btn',
                  item === duration ? 'text-white active-duration' : ''
                )}
                onClick={() => handleDurationChange(item)}>
                {CC_DURATION_MONTH_OPTIONS[item].short_label}
              </Button>
            )
          )}
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export default FilterCarbonEmissionReductionSummary;
