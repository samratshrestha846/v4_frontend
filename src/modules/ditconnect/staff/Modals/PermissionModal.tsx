import React, { SetStateAction } from 'react';
import CustomModalHeader from '@uhub/components/modal/CustomModalHeader';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import ListPermission from '../../role/pages/ListPermission';
import { Permission } from '../../role/types/Role';

type Props = {
  permissions: Permission[];
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  handleSubmit: any;
  onSubmit: any;
  submitted: boolean;
  serverValidationError: any;
  setServerValidationError: any;
  register: any;
  control: any;
  errors: any;
};

const PermissionModal: React.FC<Props> = ({
  permissions,
  showModal,
  setShowModal,
  handleSubmit,
  onSubmit,
  submitted,
  serverValidationError,
  setServerValidationError,
  register,
  control,
  errors,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop="static"
      keyboard={false}
      size="lg"
      dialogClassName="custom-modal">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <CustomModalHeader
            title="Assign Explicit Permissions"
            handleModalClose={() => setShowModal(false)}
          />
        </Modal.Header>
        <Modal.Body>
          {serverValidationError && (
            <Alert
              variant="danger"
              onClose={() => setServerValidationError(false)}
              dismissible>
              <strong>Validation Failed - </strong> Please fix validation errors
              and try again
            </Alert>
          )}
          <ListPermission
            permissions={permissions}
            readOnly={false}
            register={register}
            control={control}
            errors={errors}
            hideTitle
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="button-list float-end">
            <Button
              variant="outline"
              className="btn btn-ghost "
              onClick={() => setShowModal(false)}>
              <i className="bx bx-x me-1" /> Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className="btn btn-secondary "
              disabled={submitted}>
              <i className="bx bx-save me-1" /> Save
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PermissionModal;
