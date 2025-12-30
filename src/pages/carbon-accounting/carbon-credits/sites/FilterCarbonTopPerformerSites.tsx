import React, { SetStateAction } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import DURATION_OPTIONS, {
  DURATION_YEAR_TO_DATE,
} from '../../../../constants/durationOptions';
import { LabelNumericValue } from '../../../../types/common';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';

type Props = {
  customer: number | undefined;
  setCustomer: React.Dispatch<SetStateAction<number | undefined>>;
  duration?: string;
  setDuration: React.Dispatch<SetStateAction<string>>;
  property: number | undefined;
  setProperty: React.Dispatch<SetStateAction<number | undefined>>;
  customersOptions: any;
  propertiesOptions: any;
  isFetchingCustomersOptions: boolean;
  isFetchingPropertiesOptions: boolean;
  isErrorCustomersOptions: boolean;
  isErrorPropertiesOptions: boolean;
};

const FilterCarbonTopPerformerSites: React.FC<Props> = ({
  customer,
  setCustomer,
  duration,
  setDuration,
  property,
  setProperty,
  customersOptions,
  propertiesOptions,
  isFetchingCustomersOptions,
  isFetchingPropertiesOptions,
  isErrorCustomersOptions,
  isErrorPropertiesOptions,
}) => {
  if (isFetchingCustomersOptions || isFetchingPropertiesOptions) {
    return <CustomLoader />;
  }

  if (isErrorCustomersOptions || isErrorPropertiesOptions) {
    return <ErrorMessage />;
  }

  return (
    <Row className="g-1">
      <Col md={3} sm={6}>
        <Select
          className="mb-3"
          options={DURATION_OPTIONS}
          onChange={(e) => setDuration(e ? e.value : '')}
          placeholder="Duration"
          value={DURATION_OPTIONS?.find((item: any) => item.value === duration)}
          defaultValue={DURATION_OPTIONS.find(
            (item) => item.value === DURATION_YEAR_TO_DATE
          )}
        />
      </Col>

      <Col md={3} sm={6}>
        <Select
          className="mb-3"
          isClearable
          options={customersOptions}
          onChange={(selected: LabelNumericValue | null) =>
            setCustomer(selected ? selected.value : undefined)
          }
          placeholder="Customer"
          value={customersOptions?.find(
            (item: LabelNumericValue) => item.value === customer
          )}
        />
      </Col>

      <Col md={3} sm={6}>
        <Select
          className="mb-3"
          isClearable
          options={propertiesOptions}
          onChange={(selected: LabelNumericValue | null) =>
            setProperty(selected ? selected.value : undefined)
          }
          placeholder="Property"
          value={propertiesOptions?.find(
            (item: LabelNumericValue) => item.value === property
          )}
        />
      </Col>
    </Row>
  );
};

export default FilterCarbonTopPerformerSites;
