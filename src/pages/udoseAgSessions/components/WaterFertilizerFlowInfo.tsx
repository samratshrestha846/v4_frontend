import classNames from 'classnames';
import React from 'react';
import commaSeperatedNumber from '../../../helpers/numberHelper';

type Props = {
  flowValue: number;
  flowValueUnit?: string;
  containerClass?: string;
};

const WaterFertilizerFlowInfo: React.FC<Props> = ({
  flowValue,
  flowValueUnit,
  containerClass,
}) => {
  return (
    <div className={classNames(containerClass || '')}>
      <span className="text-center text-nowrap m-0">{`${commaSeperatedNumber(Number(flowValue)) || 0} ${flowValueUnit || ''}`}</span>
    </div>
  );
};

export default WaterFertilizerFlowInfo;
