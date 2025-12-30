import React from 'react';

type Props = {
  wrapperClass?: string;
};

const CCEmissionUnit: React.FC<Props> = ({ wrapperClass }) => {
  return (
    <span className={wrapperClass ?? 'font-10 fw-semibold'}>
      (tCO<sub>2</sub>e)
    </span>
  );
};

export default CCEmissionUnit;
