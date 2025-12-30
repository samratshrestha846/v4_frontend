import React from 'react';
import classNames from 'classnames';

type Props = {
  isActive: boolean;
  text: string;
};

const StatusColumn: React.FC<Props> = ({ isActive, text }) => {
  return (
    <div className="d-flex justify-content-start align-items-center">
      <i
        className={classNames(
          'bx bxs-circle me-1 font-12',
          isActive ? 'text-success' : 'text-light-gray'
        )}
      />
      <span>{text}</span>
    </div>
  );
};

export default StatusColumn;
