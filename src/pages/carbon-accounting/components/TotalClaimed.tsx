import React from 'react';
import CCEmissionUnit from './CCEmissionUnit';
import { DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT } from '../../../constants/constants';

type Props = {
  claimedAmount?: number;
};

const TotalClaimed: React.FC<Props> = ({ claimedAmount }) => {
  return (
    <div className="total-carbon-card">
      <div className="flex-shrink-0">
        <div className="avatar-sm">
          <span className="avatar-title bg-warning rounded-circle my-0">
            <i className="bx bx-badge-check" />
          </span>
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-start align-items-baseline flex-nowrap">
          <h3 className="m-0 text-black">
            {claimedAmount?.toFixed(DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT) ?? 0}
          </h3>
          <CCEmissionUnit wrapperClass="fw-semibold ms-1" />
        </div>
        <h5 className="m-0 font-16 text-secondary-color fw-semibold">
          Total Claimed
        </h5>
      </div>
    </div>
  );
};

export default TotalClaimed;
