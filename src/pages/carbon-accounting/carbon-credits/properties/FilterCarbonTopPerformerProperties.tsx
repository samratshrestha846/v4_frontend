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
  customersOptions: any;
  isFetchingCustomersOptions: boolean;
  isErrorCustomersOptions: boolean;
};

const FilterCarbonTopPerformerProperties: React.FC<Props> = ({
  customer,
  setCustomer,
  duration,
  setDuration,
  customersOptions,
  isFetchingCustomersOptions,
  isErrorCustomersOptions,
}) => {
  if (isFetchingCustomersOptions) {
    return <CustomLoader />;
  }

  if (isErrorCustomersOptions) {
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
    </Row>
  );
};

export default FilterCarbonTopPerformerProperties;
