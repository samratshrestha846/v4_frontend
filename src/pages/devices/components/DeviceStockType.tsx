import React from 'react';
import classNames from 'classnames';
import { stockTypes } from '../../../constants/stockTypes';
import { convertToSlug } from '../../../helpers';

type Props = {
  stockTypeName: string;
};

const StockTypeModule: React.FC<Props> = ({ stockTypeName }) => {
  return (
    <div className="d-flex justify-content-start align-items-center">
      <i
        className={classNames(
          'bx bxs-circle me-1',
          stockTypeName &&
            Object.keys(stockTypes).includes(convertToSlug(stockTypeName))
            ? stockTypes[convertToSlug(stockTypeName)].styleTextClass
            : 'bg-light text-dark'
        )}
      />
      <span>{stockTypeName}</span>
    </div>
  );
};

export default StockTypeModule;
