import React from 'react';
import { capitalizeFirstLetter } from '@uhub/helpers';
import { Button } from 'react-bootstrap';
import PermissionModal from '../Modals/PermissionModal';
import useAssignExplicitPermission from '../hooks/useAssignExplicitPermission';
import { Permission } from '../../role/types/Role';

type Props = {
  permissions: Permission[];
  userId: number;
};

const ExplicitPermission: React.FC<Props> = ({ permissions, userId }) => {
  const {
    onSubmit,
    register,
    control,
    handleSubmit,
    errors,
    showModal,
    setShowModal,
    submitted,
    serverValidationError,
    setServerValidationError,
  } = useAssignExplicitPermission(userId);

  return (
    <>
      <div className="ms-2 mb-2">
        <div className="d-flex justify-content-between align-items-center gap-2 mt-2 me-2">
          <h6 className="font-14">Explicit Permission </h6>
          <Button
            variant="secondary"
            className="btn-sm btn-outline-secondary float-end"
            onClick={() => setShowModal(true)}>
            <i className="bx bx-plus me-1" /> Assign
          </Button>
        </div>

        {permissions && permissions?.length > 0 ? (
          <div className="d-flex justify-content-start align-items-center flex-wrap gap-1 mt-2">
            {permissions?.map((permission) => (
              <span key={permission.name} className="assigned-permission">
                {capitalizeFirstLetter(permission.name)}
              </span>
            ))}
          </div>
        ) : (
          <p className="m-2 text-center">No permissions assigned yet.</p>
        )}
      </div>
      <PermissionModal
        permissions={permissions}
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        submitted={submitted}
        serverValidationError={serverValidationError}
        setServerValidationError={setServerValidationError}
        register={register}
        control={control}
        errors={errors}
      />
    </>
  );
};

export default ExplicitPermission;
