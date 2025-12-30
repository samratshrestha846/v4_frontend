import React from 'react';
import classNames from 'classnames';

type Props = {
  label: string;
  labelClass?: string;
  iconClass?: string;
  iconTextClass?: string;
  wrapperClass?: string;
};

const IconLabelStatus: React.FC<Props> = ({
  label,
  labelClass,
  iconClass,
  iconTextClass,
  wrapperClass,
}) => {
  return (
    <div
      className={classNames(
        'd-flex justify-content-start align-items-center',
        wrapperClass ?? ''
      )}>
      <i
        className={classNames(
          'me-1 font-12',
          iconClass ?? 'bx bxs-circle',
          iconTextClass ?? 'text-gray'
        )}
      />
      <span className={labelClass ?? ''}>{label}</span>
    </div>
  );
};

export default IconLabelStatus;
