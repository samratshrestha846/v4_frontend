import React from 'react';
import classNames from 'classnames';
import {
  STATUS_LABEL_ACTIVE,
  STATUS_LABEL_INACTIVE,
} from '../constants/constants';

type Props = {
  isActive: boolean;
};

const ActiveInactiveStatus: React.FC<Props> = ({ isActive }) => {
  return (
    <div className="d-flex justify-content-start align-items-center">
      <i
        className={classNames(
          'bx bxs-circle me-1 font-12',
          isActive ? 'text-success' : 'text-light-gray'
        )}
      />
      <span>{isActive ? STATUS_LABEL_ACTIVE : STATUS_LABEL_INACTIVE}</span>
    </div>
  );
};

export default ActiveInactiveStatus;
