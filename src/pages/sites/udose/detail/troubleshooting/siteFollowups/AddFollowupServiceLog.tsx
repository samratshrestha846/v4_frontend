import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import useModalFeature from '../../../../../../hooks/common/useModalFeature';
import AddServiceLogModal from '../siteServiceLogs/modal/AddServiceLogModal';
import useServiceLogList from '../siteServiceLogs/hooks/useServiceLogList';

type Props = {
  refetchSiteFollowups: () => void;
  followupId: number;
};

const AddFollowupServiceLog: React.FC<Props> = ({
  refetchSiteFollowups,
  followupId,
}) => {
  const { showModal, toggleModal } = useModalFeature();
  const { refetch: refetchServiceLogs } = useServiceLogList();
  return (
    <>
      <button
        type="button"
        className="border-0 device-list-edit-action bg-transparent"
        onClick={toggleModal}>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="add"> Add Service Log </Tooltip>}>
          <i className="bx bx-notepad text-secondary" />
        </OverlayTrigger>
      </button>
      <AddServiceLogModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetchServiceLogs={refetchServiceLogs}
        refetchSiteFollowups={refetchSiteFollowups}
        followupId={followupId}
      />
    </>
  );
};

export default AddFollowupServiceLog;
