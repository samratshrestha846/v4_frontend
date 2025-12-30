import React from 'react';
import CancelButton from '@uhub/components/Form/CancelButton';
import DeleteButton from '@uhub/components/Form/DeleteButton';
import { formattedShortDate } from '@uhub/helpers';
import { WorkDiaryResponse } from '../types/WorkDiary';
import useDeleteWorkDiary from '../hooks/useDeleteWorkDiary';

type Props = {
  toggleModal?: () => void;
  workDiary?: WorkDiaryResponse;
};

const DeleteWorkDiary: React.FC<Props> = ({ toggleModal, workDiary }) => {
  const { handleDelete } = useDeleteWorkDiary({
    id: workDiary?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to delete `}
          <span className="fst-italic text-primary-color">
            {workDiary?.user
              ? `${workDiary?.user?.name ?? `${workDiary?.user?.first_name} ${workDiary?.user?.last_name}`}'s `
              : ''}
          </span>
          {`daily diary for `}
          <span className="fst-italic text-primary-color">
            {workDiary?.date ? formattedShortDate(workDiary.date) : '-'}
          </span>
          {` ? `}
        </p>
      </div>

      <div className="button-list float-end mt-3">
        <CancelButton redirectOnClick={toggleModal || (() => {})} />
        <DeleteButton handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default DeleteWorkDiary;
