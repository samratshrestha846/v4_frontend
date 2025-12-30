import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'react-bootstrap';
import AssignExplicitPermission from '../AssignExplicitPermission';
import { User } from '../../../../types/user/user';
import CustomModalHeader from '../../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  user: User | undefined;
  refetch: () => void;
};

const AddPermissionModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  user,
  refetch,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop="static"
      keyboard={false}
      size="lg"
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title="Assign Explicit Permissions"
          handleModalClose={() => setShowModal(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <AssignExplicitPermission
          setShowModal={setShowModal}
          user={user}
          refetch={refetch}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddPermissionModal;
