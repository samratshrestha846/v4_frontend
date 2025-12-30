import React, { Dispatch, SetStateAction } from 'react';
import { Button, Card } from 'react-bootstrap';
import { User } from '../../../../types/user/user';
import { capitalizeFirstLetter } from '../../../../helpers';
import AddPermissionModal from '../modal/AddPermissionModal';

type Props = {
  showModal: boolean;
  user: User | undefined;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
};

const UserPermission: React.FC<Props> = ({
  showModal,
  user,
  setShowModal,
  refetch,
}) => {
  const formatPermission = (permission: string) => {
    const splittedData = permission.split('_');
    return splittedData.join(' ');
  };
  return (
    <>
      <Card className="tilebox-one">
        <Card.Body>
          <div>
            <div className="d-flex justify-content-between align-items-center gap-2">
              <h5 className="text-primary-color">Explicit Permissions</h5>
              <Button
                variant="secondary"
                className="btn-sm btn-outline-secondary  float-end"
                onClick={() => setShowModal(true)}>
                <i className="bx bx-plus me-1" /> Assign
              </Button>
            </div>

            {user?.permissions && user?.permissions?.length > 0 ? (
              <div className="d-flex justify-content-start align-items-center flex-wrap gap-1 mt-2">
                {user?.permissions?.map((permission) => (
                  <span key={permission.id} className="assigned-permission">
                    {capitalizeFirstLetter(formatPermission(permission.name))}
                  </span>
                ))}
              </div>
            ) : (
              <p className="m-2 text-center">No permissions assigned yet.</p>
            )}
          </div>
        </Card.Body>
      </Card>
      <AddPermissionModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        refetch={refetch}
      />
    </>
  );
};

export default UserPermission;
