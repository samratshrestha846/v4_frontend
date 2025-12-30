import React, { SetStateAction } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import DURATION_OPTIONS, {
  DURATION_YEAR_TO_DATE,
} from '../../../../constants/durationOptions';

type Props = {
  duration?: string;
  setDuration: React.Dispatch<SetStateAction<string>>;
};

const FilterCarbonTopPerformerCustomer: React.FC<Props> = ({
  duration,
  setDuration,
}) => {
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
    </Row>
  );
};

export default FilterCarbonTopPerformerCustomer;
