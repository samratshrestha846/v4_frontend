import React from 'react';
import { Button } from 'react-bootstrap';
import { User } from '../../types/user/user';
import useDeactivateUser from './hooks/useDeactivateUser';

type Props = {
  toggleModal: () => void;
  refetch?: () => void;
  user?: User;
};

const DeactivateUser: React.FC<Props> = ({ toggleModal, refetch, user }) => {
  const { handleDeactivate } = useDeactivateUser({
    refetch,
    toggleModal,
    id: user?.id,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="my-2 fw-semibold text-secondary-color">
          {`Are you sure you want to deactivate ${user?.first_name} ${user?.last_name} ?`}
        </p>
      </div>

      <div className="float-end button-list mt-2">
        <Button
          variant="outline"
          className="btn btn-ghost"
          onClick={toggleModal}>
          <i className="bx bx-x" />
          Cancel
        </Button>
        <Button className="btn btn-primary" onClick={handleDeactivate}>
          <i className="bx bx-user-x" />
          Deactivate
        </Button>
      </div>
    </>
  );
};

export default DeactivateUser;
