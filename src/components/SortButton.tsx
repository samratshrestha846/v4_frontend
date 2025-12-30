import React from 'react';
import classNames from 'classnames';
import { SORTING_ORDER_ASC } from '../constants/constants';

type SortButtonProps = {
  dataField: string;
  sort?: string;
  direction?: string;
};

const SortButton: React.FC<SortButtonProps> = ({
  dataField,
  sort,
  direction,
}) => {
  return (
    <div className="order d-flex flex-column justify-content-center align-items-center">
      {sort !== dataField ? (
        <>
          <i className="bx bx-caret-up sort-btn-disable sort-caret-icon" />
          <i className="bx bx-caret-down sort-btn-disable sort-caret-icon" />
        </>
      ) : (
        <>
          <i
            className={classNames(
              'bx bx-caret-up sort-caret-icon',
              direction === SORTING_ORDER_ASC ? '' : 'sort-btn-disable'
            )}
          />
          <i
            className={classNames(
              'bx bx-caret-down sort-caret-icon',
              direction === SORTING_ORDER_ASC ? 'sort-btn-disable' : ''
            )}
          />
        </>
      )}
    </div>
  );
};

export default SortButton;
