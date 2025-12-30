import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditSiteFollowupModal from './modal/EditSiteFollowupModal';
import useModalFeature from '../../../../../../hooks/common/useModalFeature';

type Props = {
  followipId: number;
  refetchSiteFollowups: any;
};

const EditSiteFollowupButton: React.FC<Props> = ({
  followipId,
  refetchSiteFollowups,
}) => {
  const { showModal, toggleModal } = useModalFeature();
  return (
    <>
      <button
        type="button"
        className="border-0 bg-transparent"
        onClick={toggleModal}>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="Tooltip"> Edit </Tooltip>}>
          <i className="bx bx-edit text-info" />
        </OverlayTrigger>
      </button>
      <EditSiteFollowupModal
        followupId={followipId}
        showModal={showModal}
        toggleModal={toggleModal}
        refetchSiteFollowups={refetchSiteFollowups}
      />
    </>
  );
};

export default EditSiteFollowupButton;
