import React from 'react';
import { Form } from 'react-bootstrap';
import usePublishLabReport from './hooks/usePublishLabReport';
import ConfirmPublishModal from './modal/ConfirmPublishModal';

import { LAB_REPORT_PUBLISHED } from '../../../constants/labConstants';
import { can } from '../../../helpers/checkPermission';
import { UPDATE_LAB_REPORT } from '../../../constants/permissions';

type Props = {
  labReportId?: number;
  labReportStatus?: string;
  refetch?: () => void;
};

const PublishLabReport: React.FC<Props> = ({
  labReportId,
  labReportStatus,
  refetch,
}) => {
  const {
    showModal,
    setShowModal,
    handleChange,
    handleCancel,
    status,
    handleSubmit,
  } = usePublishLabReport(refetch, labReportId, labReportStatus);

  const canUpdateLabReport = can(UPDATE_LAB_REPORT);

  return (
    <>
      <Form.Switch
        id="custom-switch"
        className="custom-switch"
        checked={status === LAB_REPORT_PUBLISHED}
        onChange={handleChange}
        value={status}
        disabled={!canUpdateLabReport}
      />
      {showModal && (
        <ConfirmPublishModal
          showModal={showModal}
          status={status}
          handleCancel={handleCancel}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default PublishLabReport;
