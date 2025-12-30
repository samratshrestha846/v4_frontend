import React from 'react';

type Props = {
  wrapperClass?: string;
  labelText?: string;
  baseText?: string;
  supText?: number | string;
  showParentheses?: boolean;
};

const UnitWithSup: React.FC<Props> = ({
  wrapperClass,
  labelText,
  baseText,
  supText,
  showParentheses,
}) => {
  return (
    <div className={wrapperClass ?? ''}>
      {labelText ? <span className="me-1">{labelText}</span> : ''}
      {showParentheses ? (
        <>
          ({baseText ?? ''}
          <sup>{supText ?? ''}</sup>)
        </>
      ) : (
        <>
          {baseText ?? ''}
          <sup>{supText ?? ''}</sup>
        </>
      )}
    </div>
  );
};

export default UnitWithSup;
