import React from 'react';
import { Button } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import { FolderResponse } from '../../types/Document';
import useDeleteFolder from '../../hooks/Folder/useDeleteFolder';

type Props = {
  toggleModal?: () => void;
  folder?: FolderResponse;
};

const DeleteFolder: React.FC<Props> = ({ toggleModal, folder }) => {
  const { handleDelete } = useDeleteFolder({
    id: folder?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to delete `}
          <span className="fst-italic text-primary-color">
            {folder?.name ?? ''}
          </span>
          {` folder ? `}
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

export default DeleteFolder;
