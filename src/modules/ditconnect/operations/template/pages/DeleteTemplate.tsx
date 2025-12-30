import React from 'react';
import { Button } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import { TemplateResponse } from '../types/Template';
import useDeleteTemplate from '../hooks/useDeleteTemplate';

type Props = {
  toggleModal?: () => void;
  template?: TemplateResponse;
};

const DeleteTemplate: React.FC<Props> = ({ toggleModal, template }) => {
  const { handleDelete } = useDeleteTemplate({
    id: template?.id,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to delete `}
          <span className="fst-italic text-primary-color">
            {template?.title ?? ''}
          </span>
          {` template ? `}
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

export default DeleteTemplate;
