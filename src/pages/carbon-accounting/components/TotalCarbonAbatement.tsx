import React from 'react';
import CCEmissionUnit from './CCEmissionUnit';
import { CarbonEmissionReduction } from '../../../types/carbon-accounting/carbonAccounting';
import {
  DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT,
  SUPPLEMENT_FEED_UNIT_ML,
} from '../../../constants/constants';

type Props = {
  carbonEmissionReduction?: CarbonEmissionReduction;
};

const TotalCarbonAbatement: React.FC<Props> = ({ carbonEmissionReduction }) => {
  return (
    <div className="total-carbon-card">
      <div className="flex-shrink-0">
        <div className="avatar-sm">
          <span className="avatar-title bg-primary rounded-circle my-0">
            <i className="bx bx-credit-card" />
          </span>
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-center flex-nowrap">
          <div className="d-flex justify-content-start align-items-baseline">
            <h3 className="m-0 text-black">
              {carbonEmissionReduction?.total_actual_emission.toFixed(
                DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT
              ) ?? 0}
            </h3>
            <CCEmissionUnit wrapperClass="fw-semibold ms-1" />
          </div>
          <div>
            <i className="bx bx-droplet text-warning me-1" />
            <span className="text-secondary-color fw-semibold">
              {`${
                carbonEmissionReduction?.supplement_feed_in_ml.toFixed(
                  DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT
                ) ?? 0
              } ${SUPPLEMENT_FEED_UNIT_ML}`}
            </span>
          </div>
        </div>
        <h5 className="m-0 font-16 text-secondary-color fw-semibold">
          Total Carbon Abatement
        </h5>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <span className="text-gray fw-semibold text-nowrap">
            {carbonEmissionReduction?.customer_count ?? 0} Customers
          </span>
          <span className="text-gray fw-semibold text-nowrap">
            {carbonEmissionReduction?.customer_property_count ?? 0} Properties
          </span>
          <span className="text-gray fw-semibold text-nowrap">
            {carbonEmissionReduction?.site_count ?? 0} Sites
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalCarbonAbatement;
