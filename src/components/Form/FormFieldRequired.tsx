import React from 'react';

type Props = {
  testColorClass?: string;
};

const FormFieldRequired: React.FC<Props> = ({ testColorClass }) => {
  return (
    <sup>
      <span className={testColorClass ?? 'text-danger'}>*</span>
    </sup>
  );
};

export default FormFieldRequired;
