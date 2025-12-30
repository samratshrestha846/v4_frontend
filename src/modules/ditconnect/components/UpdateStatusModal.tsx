import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import useUpdatePatch from '../hooks/useUpdatePatch';

type Props = {
  title: string;
  data: Record<string, unknown>;
  endpoint: string;
  refetchKey: string;
  toggleModal: () => void;
};

const UpdateStatusModal: React.FC<Props> = ({
  title,
  data,
  endpoint,
  refetchKey,
  toggleModal,
}) => {
  const { updatePatchRecord, isLoading } = useUpdatePatch({
    title,
    data,
    endpoint,
    refetchKey,
    toggleModal,
  });

  return (
    <div className="d-flex flex-column gap-2">
      <p className="fw-semibold text-secondary-color">
        Are you sure you want to update <strong>{title}</strong>?
      </p>

      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="outline-secondary"
          className="btn btn-ghost"
          onClick={toggleModal}>
          Cancel
        </Button>

        <Button
          variant="secondary"
          className="btn btn-secondary d-flex align-items-center gap-2"
          disabled={isLoading}
          onClick={updatePatchRecord}
          aria-busy={isLoading}
          aria-disabled={isLoading}>
          {isLoading && <Spinner animation="border" size="sm" />}
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
