import React, { ReactNode } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import useViewLabReportAsPdf from './hooks/useViewLabReportAsPdf';
import Loader from '../../components/Loader';

type Props = {
  labReportId: number;
  refetch: any;
  readAt: string | null;
  children?: ReactNode;
};

const ViewLabReportAsPdf: React.FC<Props> = ({
  labReportId,
  refetch,
  readAt,
  children,
}) => {
  const { handleDownloadReport, loading } = useViewLabReportAsPdf(
    labReportId,
    refetch,
    readAt
  );

  return (
    <>
      {loading && <Loader />}

      {children ? (
        <Button
          variant="link"
          onClick={handleDownloadReport}
          className="mb-1 m-0 p-0 action-icon">
          {children}
        </Button>
      ) : (
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
      )}
    </>
  );
};
export default ViewLabReportAsPdf;
