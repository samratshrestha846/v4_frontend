import React from 'react';
import { Modal } from 'react-bootstrap';
import EditSiteServiceLog from '../EditServiceLog';
import { ServiceLog } from '../../../../../../../types/udose/serviceLog';
import CustomModalHeader from '../../../../../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  refetchServiceLogs: () => void;
  serviceLogDetail?: ServiceLog;
};

const EditServiceLogModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  refetchServiceLogs,
  serviceLogDetail,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title="Edit Service Log"
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <EditSiteServiceLog
          toggleModal={toggleModal}
          refetchServiceLogs={refetchServiceLogs}
          serviceLogDetail={serviceLogDetail}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditServiceLogModal;
