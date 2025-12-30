import classNames from 'classnames';
import React from 'react';

type Props = {
  title: string;
  text?: string;
  bottomText?: string;
  trend?: number;
  wrapperClass?: string;
  children?: React.ReactNode;
};
const AnalyticsCard: React.FC<Props> = ({
  title,
  text,
  bottomText,
  trend,
  wrapperClass,
  children,
}) => {
  return (
    <div
      className={classNames(
        'analytics-card border-bottom border-2',
        wrapperClass ?? ''
      )}>
      <h5 className="m-0 fw-semibold text-nowrap text-primary-color">
        {title}
      </h5>

      {children || (
        <div>
          {text && (
            <p className="m-0 font-24 fw-semibold text-black text-nowrap">
              {text}
            </p>
          )}
          <div className="d-flex justify-content-between align-items-end flex-nowrap">
            {bottomText && (
              <small className="fw-semibold text-nowrap">{bottomText}</small>
            )}
            {trend && (
              <div
                className={classNames(
                  'fw-semibold',
                  trend ? 'text-success' : 'text-danger'
                )}>
                <i
                  className={classNames(trend ? 'bx bx-plus' : 'bx bx-minus')}
                />
                <span>{`${trend}%`}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;
