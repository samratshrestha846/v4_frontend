import React from 'react';
import { Button } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import { RoleResponse } from '../types/Role';
import useDeleteRole from '../hooks/useDeleteRole';

type Props = {
  toggleModal?: () => void;
  role?: RoleResponse;
};

const DeleteRole: React.FC<Props> = ({ toggleModal, role }) => {
  const { handleDelete } = useDeleteRole({
    id: role?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to delete `}
          <span className="fst-italic text-primary-color">
            {role?.name ?? ''}
          </span>
          {` role ? `}
        </p>
      </div>

      <div className="button-list float-end mt-3">
        <CancelButton redirectOnClick={toggleModal || (() => {})} />
        <Button variant="danger" onClick={handleDelete}>
          <i className="bx bx-trash me-1 font-18" />
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteRole;
