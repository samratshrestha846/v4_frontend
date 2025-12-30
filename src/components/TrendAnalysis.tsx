import classNames from 'classnames';
import React from 'react';

type Props = {
  trendAmount?: number;
  wrapperClass?: string;
};

const TrendAnalysis: React.FC<Props> = ({ trendAmount, wrapperClass }) => {
  if (!trendAmount || typeof trendAmount !== 'number') {
    return null;
  }

  const isUp = trendAmount && trendAmount > 0;
  const amount = trendAmount ? Math.abs(trendAmount) : trendAmount;

  return (
    <div className={wrapperClass ?? ''}>
      <sub>
        <span
          className={classNames(
            'd-flex justify-content-start align-items-center fw-semibold',
            isUp ? 'text-success' : 'text-danger'
          )}>
          <i className={classNames(isUp ? 'bx bx-plus' : 'bx bx-minus')} />
          <span>{`${amount}%`}</span>
        </span>
      </sub>
    </div>
  );
};

export default TrendAnalysis;
