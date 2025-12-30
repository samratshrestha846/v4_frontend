import { numberFormat } from '@uhub/helpers/api/utils';
import classNames from 'classnames';
import React from 'react';

type Props = {
  totalFilledUsers: number;
  totalUsers: number;
};

const WorkDiaryFilledInfo: React.FC<Props> = ({
  totalFilledUsers,
  totalUsers,
}) => {
  const percentage =
    totalFilledUsers > 0
      ? numberFormat((totalFilledUsers / totalUsers) * 100)
      : 0;

  return (
    <div className=" d-flex justify-conten-start align-items-center gap-2 my-3">
      <span className="bg-light px-2 py-1 rounded-2 text-gray fw-semibold">
        Work Diaries Completed: {totalFilledUsers} / {totalUsers}
      </span>
      <span
        className={classNames(
          'px-2 py-1 rounded-2  fw-semibold',
          Number(percentage) > 90
            ? 'bg-wuccess text0white'
            : 'bg-light  text-gray'
        )}>
        Progress: {percentage}%
      </span>
    </div>
  );
};

export default WorkDiaryFilledInfo;
