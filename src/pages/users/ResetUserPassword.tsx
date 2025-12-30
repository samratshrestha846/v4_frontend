import React from 'react';
import { Button } from 'react-bootstrap';
import { User } from '../../types/user/user';
import useResetUserPassword from './hooks/useResetUserPassword';

type Props = {
  toggleModal: () => void;
  refetch?: () => void;
  user?: User;
};

const ResetUserPassword: React.FC<Props> = ({ toggleModal, refetch, user }) => {
  const { handleResetPassword } = useResetUserPassword({
    refetch,
    toggleModal,
    id: user?.id,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to reset password of ${user?.first_name} ${user?.last_name} ?`}
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
        <Button className="btn btn-primary" onClick={handleResetPassword}>
          <i className="bx bx-reset" />
          Reset Password
        </Button>
      </div>
    </>
  );
};

export default ResetUserPassword;
