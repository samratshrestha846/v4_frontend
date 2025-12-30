import React from 'react';
import { Button } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import { StaffResponse } from '../types/Staff';
import useChangeStaffStatus from '../hooks/useChangeStaffStatus';

type Props = {
  toggleModal?: () => void;
  staff?: StaffResponse;
};

const DeactivateStatus: React.FC<Props> = ({ toggleModal, staff }) => {
  const { handleChangeStatus } = useChangeStaffStatus({
    id: staff?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          Are you sure you want to deactive
          <span className="fst-italic text-primary-color">
            {` ${staff?.user.first_name ?? ''} ${staff?.user.last_name ?? ''}`}
          </span>
        </p>
      </div>

      <div className="button-list float-end mt-3">
        <CancelButton redirectOnClick={toggleModal || (() => {})} />

        <Button className="btn btn-primary" onClick={handleChangeStatus}>
          <i className="bx bx-user-x me-1 font-18" />
          Deactivate
        </Button>
      </div>
    </>
  );
};

export default DeactivateStatus;
