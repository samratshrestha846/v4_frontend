import React from 'react';

type Props = {
  title: string;
  handleModalClose: () => void;
  icon?: string;
};

const CustomModalHeader: React.FC<Props> = ({
  title,
  handleModalClose,
  icon,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center custom-modal-header-wrapper">
      {icon ? (
        <div>
          {icon && <i className={icon} />}
          <h5 className="text-primary-color m-0 font-16">{title}</h5>
        </div>
      ) : (
        <h5 className="text-primary-color m-0 font-16">{title}</h5>
      )}

      <button
        onClick={handleModalClose}
        type="button"
        className="btn btn-sm custom-modal-close-button">
        <i className="bx bx-x font-20" />
      </button>
    </div>
  );
};

export default CustomModalHeader;
