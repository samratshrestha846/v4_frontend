import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isHide: boolean;
  setIsHide: Dispatch<SetStateAction<boolean>>;
  headerText?: string;
};

const CustomCollapseHeader: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  isHide,
  setIsHide,
  headerText,
}) => {
  return (
    <div
      className={classNames(
        'd-flex justify-content-between align-aitems-center py-1 custom-collapse-header',
        isOpen ? 'custom-collapse-header-active' : ''
      )}>
      <div className="d-flex justify-content-start align-items-center gap-1">
        <button
          type="button"
          className={classNames('btn btn-link p-0 m-0')}
          onClick={() => setIsOpen((preValue: boolean) => !preValue)}>
          <i
            className={classNames(
              'mx-1',
              isOpen
                ? 'bx bx-chevron-down text-primary menu-toggle-button-active'
                : 'bx bx-chevron-right text-gray menu-toggle-button'
            )}
          />
          <span className="text-primary">{headerText}</span>
        </button>
      </div>
      <span className="circle-medium show-hide-btn-wrapper text-black fw-bold me-1">
        <button
          type="button"
          className="btn btn-link p-0 m-0 show-hide-btn text-black"
          onClick={() => setIsHide((prevHide: boolean) => !prevHide)}>
          <i
            className={classNames(
              isHide ? 'bx bx-hide' : 'bx bx-show',
              isOpen ? 'text-primary' : 'text-gray'
            )}
          />
        </button>
      </span>
    </div>
  );
};

export default CustomCollapseHeader;
