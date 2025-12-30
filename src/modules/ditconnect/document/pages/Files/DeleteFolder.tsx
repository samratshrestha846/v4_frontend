import React from 'react';
import { Button } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import { FileResponse } from '../../types/Document';
import useDeleteFile from '../../hooks/File/useDeleteFile';

type Props = {
  toggleModal?: () => void;
  file?: FileResponse;
};

const DeleteFile: React.FC<Props> = ({ toggleModal, file }) => {
  const { handleDelete } = useDeleteFile({
    id: file?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to delete `}
          <span className="fst-italic text-primary-color">
            {file?.name ?? ''}
          </span>
          {` file ? `}
        </p>
      </div>

      <div className="button-list float-end mt-3">
        <CancelButton redirectOnClick={toggleModal || (() => {})} />

        <Button variant="danger" onClick={handleDelete}>
          <i className="bx bx-trash me-1 font-18" />
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteFile;
