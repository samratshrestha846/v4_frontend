import { formattedShortDate, formattedTime } from '@uhub/helpers';
import classNames from 'classnames';
import React from 'react';

type Props = {
  dataTime: string | Date;
  containerClass?: string;
  dateTextClass?: string;
  timeTextClass?: string;
};

const FormattedDateTime: React.FC<Props> = ({
  dataTime,
  containerClass,
  dateTextClass,
  timeTextClass,
}) => {
  return (
    <div className={containerClass ?? ''}>
      <p className={classNames('m-0 text-nowrap', dateTextClass ?? '')}>
        {formattedShortDate(dataTime)}
      </p>
      <small className={classNames(timeTextClass ?? 'text-slate-gray')}>
        {formattedTime(dataTime)}
      </small>
    </div>
  );
};

export default FormattedDateTime;
