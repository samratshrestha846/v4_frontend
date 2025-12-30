import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';

import NutrientCalculatorForm from './NutrientCalculatorForm';
import CustomLoader from '../../../../../components/CustomLoader';
import {
  CALCULATOR_TYPE_OPTIONS,
  DOSE_RATE_CALCULATOR,
} from '../../../../../constants/constants';
import useCalculationType from './hooks/useCalculationType';
import useSupplementsDropdown from '../../../../../hooks/dropdown/useSupplementsDropdown';
import CustomTooltip from '../../../../../components/CustomTooltip';

const CostAnalysis: React.FC = () => {
  const { calculationType, setCalculationType } = useCalculationType();

  const { data: supplementOptions, isFetching: isFetchingSupplementOptions } =
    useSupplementsDropdown();

  if (isFetchingSupplementOptions) {
    return <CustomLoader />;
  }

  return (
    <div className="cost-feed-calculator">
      <h5 className="text-primary-color">Cost Feed Calculator</h5>

      <Row>
        <Col md={3} className="mb-3">
          <Form.Label>
            <div className="d-flex justify-content-start align-items-center gap-1">
              <span>Calculation type</span>
              <CustomTooltip
                tooltipText="This field is used to calculate feed costs and nutrients."
                outerwrapperClass="bg-white"
                anglePeakClass="bg-white"
                innerWrapperClass="text-fit-content bg-white"
                iconClass="bx bx-info-circle"
                tooltipTextClass="text-muted font-12">
                <i className="bx bx-info-circle" />
              </CustomTooltip>
            </div>
          </Form.Label>
          <Select
            name="calculation_type"
            label="Calculation Type"
            options={CALCULATOR_TYPE_OPTIONS}
            onChange={(selected: any) => {
              setCalculationType(
                selected ? selected?.value : DOSE_RATE_CALCULATOR
              );
            }}
            defaultValue={CALCULATOR_TYPE_OPTIONS.find(
              (item) => item.value === calculationType
            )}
          />
        </Col>
      </Row>
      {calculationType === DOSE_RATE_CALCULATOR ? (
        <NutrientCalculatorForm supplementOptions={supplementOptions ?? []} />
      ) : null}
    </div>
  );
};

export default CostAnalysis;
