import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import useModalFeature from '../../../../../../hooks/common/useModalFeature';
import { ServiceLog } from '../../../../../../types/udose/serviceLog';
import EditServiceLogModal from './modal/EditServiceLogModal';

type Props = {
  serviceLogDetail?: ServiceLog;
  refetchServiceLogs: () => void;
};

const EditServiceLogButton: React.FC<Props> = ({
  serviceLogDetail,
  refetchServiceLogs,
}) => {
  const { showModal, toggleModal } = useModalFeature();
  return (
    <>
      <button
        type="button"
        className="border-0 device-list-edit-action bg-transparent"
        onClick={toggleModal}>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="add"> Edit </Tooltip>}>
          <i className="bx bx-edit text-info" />
        </OverlayTrigger>
      </button>
      <EditServiceLogModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetchServiceLogs={refetchServiceLogs}
        serviceLogDetail={serviceLogDetail}
      />
    </>
  );
};

export default EditServiceLogButton;
