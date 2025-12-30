import classNames from 'classnames';
import React from 'react';

type Props = {
  children: React.ReactNode;
  tooltipText?: string;
  tooltipTextClass?: string;
  showIcon?: boolean;
  wrapperClass?: string;
  outerwrapperClass?: string;
  innerWrapperClass?: string;
  anglePeakClass?: string;
  iconClass?: string;
  iconTextClass?: string;
};

const CustomTooltip: React.FC<Props> = ({
  children,
  tooltipText,
  tooltipTextClass,
  showIcon,
  outerwrapperClass,
  wrapperClass,
  innerWrapperClass,
  anglePeakClass,
  iconClass,
  iconTextClass,
}) => {
  return (
    <div className={classNames('custom-tooltip', outerwrapperClass ?? '')}>
      {children}
      <div
        className={classNames(
          'custom-tooltip-message-wrapper',
          wrapperClass ?? ''
        )}>
        <span
          className={classNames('custom-tooltip-pointer', anglePeakClass ?? '')}
        />
        <div
          className={classNames(
            'custom-tooltip-message',
            innerWrapperClass ?? ''
          )}>
          {showIcon && (
            <i
              className={classNames(
                iconClass ?? 'bx bx-alarm',
                iconTextClass ?? 'text-warning'
              )}
            />
          )}
          <span className={tooltipTextClass ?? ''}>{tooltipText ?? ''}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;
