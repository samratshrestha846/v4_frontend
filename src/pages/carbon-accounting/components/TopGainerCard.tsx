import React from 'react';
import CCEmissionUnit from './CCEmissionUnit';
import TrendAnalysis from '../../../components/TrendAnalysis';
import { DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT } from '../../../constants/constants';

type Props = {
  amount: number;
  title: string;
  trend?: number;
};

const TopGainerCard: React.FC<Props> = ({ amount, title, trend }) => {
  return (
    <div className="top-gainer-card">
      <div className="top-gainer-card-content">
        <h4 className="m-0 text-black">
          {amount.toFixed(DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT)}
        </h4>
        <CCEmissionUnit wrapperClass="font-10 fw-semibold ms-1" />
        <TrendAnalysis trendAmount={trend} wrapperClass="ms-half" />
      </div>
      <h5 className="m-0 text-secondary-color fw-semibold text-truncate">
        {title}
      </h5>
    </div>
  );
};

export default TopGainerCard;
