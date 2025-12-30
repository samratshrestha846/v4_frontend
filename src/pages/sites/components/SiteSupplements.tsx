import React from 'react';
import classNames from 'classnames';
import { Supplement } from '../../../types/supplements/supplement';

type Props = {
  supplement: Supplement | undefined;
  traceSupplements: Supplement[];
  showConcentration?: boolean;
  wrapperClass?: string;
  itemClass?: string;
};

const SiteSupplements: React.FC<Props> = ({
  supplement,
  traceSupplements,
  showConcentration,
  wrapperClass,
  itemClass,
}) => {
  return (
    <div className={wrapperClass ?? ''}>
      <p className={classNames('p-0 m-0', itemClass ?? 'text-nowrap')}>
        {showConcentration
          ? `${supplement?.name} (${supplement?.standard_concentration}%)`
          : supplement?.name ?? '-'}
      </p>
      <ul className="item-lists">
        {traceSupplements?.slice(0, 2).map((item) => (
          <li
            key={item.id}
            className={classNames(
              'item-lists-item',
              itemClass ?? 'text-nowrap'
            )}>
            <small>
              {showConcentration
                ? `${item.name} (${item.standard_concentration}%)`
                : item.name ?? '-'}
            </small>
          </li>
        ))}

        {traceSupplements?.length > 2 && (
          <li className="item-lists-item text-nowrap">...</li>
        )}
      </ul>
    </div>
  );
};

export default SiteSupplements;
