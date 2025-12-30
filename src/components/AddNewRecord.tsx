import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  url?: string;
  title: string;
  icon?: string;
  marginEnd?: string;
  containerClass?: string;
  toggleModal?: () => void;
};

const AddNewRecord: React.FC<Props> = ({
  url,
  title,
  icon,
  marginEnd,
  containerClass,
  toggleModal,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (toggleModal) {
      toggleModal();
      return;
    }
    if (url) {
      navigate(url);
    }
  };
  return (
    <div
      className={classNames(
        'd-flex justify-content-end align-items-center',
        containerClass ?? ''
      )}>
      <Button
        variant="secondary"
        className={classNames('btn btn-secondary btn-sm m-0', marginEnd || '')}
        onClick={handleClick}>
        <i className={classNames('me-1', icon || 'bx bx-plus ')} />
        {title || 'Add New Record'}
      </Button>
    </div>
  );
};

export default AddNewRecord;
