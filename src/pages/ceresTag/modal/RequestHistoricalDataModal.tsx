import React from 'react';
import { Button } from 'react-bootstrap';
import useRequestHistoricalData from '../hooks/useRequestHistoricalData';
import { CeresTag } from '../../../types/ceresTag/ceresTag';

type Props = {
  toggleModal?: () => void;
  ceresTag: CeresTag;
};

const RequestHistoricalDataModal: React.FC<Props> = ({
  toggleModal,
  ceresTag,
}) => {
  const { sendRequest } = useRequestHistoricalData({
    ceresTagESN: ceresTag?.esn,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to request historical data of `}
          <span className="fst-italic">{ceresTag?.vid}</span> tag?
        </p>
      </div>
      <div className="button-list float-end mt-3">
        <Button
          variant="outline"
          className="btn btn-ghost"
          onClick={toggleModal}>
          <i className="bx bx-x me-1 font-18" />
          Cancel
        </Button>
        <Button className="btn btn-save" onClick={sendRequest}>
          <i className="bx bx-history me-1 font-18" />
          Request
        </Button>
      </div>
    </>
  );
};

export default RequestHistoricalDataModal;
