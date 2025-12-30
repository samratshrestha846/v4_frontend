import classNames from 'classnames';
import React from 'react';

type Props = {
  wrapperClass?: string;
  title: string[];
  iconClass?: string;
  iconColorClass?: string;
  borderClass?: string;
  bgClass?: string;
  textClass?: string;
};

const IconInfoCard: React.FC<Props> = ({
  wrapperClass,
  title,
  iconClass,
  iconColorClass,
  borderClass,
  bgClass,
  textClass,
}) => {
  return (
    <div
      className={
        wrapperClass ?? 'd-flex justify-content-center align-items-center'
      }>
      <div className="flex-shrink-0">
        <div className="avatar-xs rounded">
          <span
            className={classNames(
              'avatar-title border rounded-circle my-0',
              borderClass ?? 'border-warning',
              bgClass ?? 'bg-warning'
            )}>
            <i
              className={classNames(
                iconClass ?? 'bx bxs-droplet',
                iconColorClass ?? 'text-warninig'
              )}
            />
          </span>
        </div>
      </div>

      <div className="flex-grow-1 trace-supplements">
        {title?.map((item) => (
          <span
            key={item}
            className={classNames(
              'trace-supplements-item',
              textClass ?? 'badge text-black-50 fw-bold font-12 fw-normal'
            )}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IconInfoCard;
