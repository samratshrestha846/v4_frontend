import React from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

type Props = {
  toggleModal: () => void;
  title: string;
  icon?: string;
  marginEnd?: string;
};

const AddNewRecordUsingModal: React.FC<Props> = ({
  toggleModal,
  title,
  icon,
  marginEnd,
}) => {
  return (
    <div className="d-flex justify-content-end align-items-center">
      <Button
        variant="secondary"
        className={classNames('btn btn-secondary btn-sm m-0', marginEnd || '')}
        onClick={toggleModal}>
        <i className={classNames('me-1', icon || 'bx bx-plus ')} />
        {title || 'Add New Record'}
      </Button>
    </div>
  );
};

export default AddNewRecordUsingModal;
