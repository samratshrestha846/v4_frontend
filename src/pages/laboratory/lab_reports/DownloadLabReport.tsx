import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import useDownloadLabReport from './hooks/useDownloadLabReport';
import Loader from '../../../components/Loader';

type Props = {
  labReportId?: number;
};

const DownloadLabReport: React.FC<Props> = ({ labReportId }) => {
  const { handleDownloadReport, loading } = useDownloadLabReport(labReportId);

  return (
    <>
      {loading && <Loader />}
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="view"> View </Tooltip>}>
        <Button
          variant="link"
          onClick={handleDownloadReport}
          className="mb-1 m-0 p-0 action-icon">
          <i className="bx bx-show text-secondary pt-0" />
        </Button>
      </OverlayTrigger>
    </>
  );
};
export default DownloadLabReport;
