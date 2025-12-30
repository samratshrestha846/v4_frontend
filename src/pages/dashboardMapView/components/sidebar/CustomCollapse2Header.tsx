import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isHide: boolean;
  setIsHide: Dispatch<SetStateAction<boolean>>;
  icon?: string;
  headerText?: string;
  iconUrl?: string;
  iconColorClass?: string;
  count?: number;
};

const CustomCollapse2Header: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  isHide,
  setIsHide,
  headerText,
  icon,
  iconUrl,
  iconColorClass,
  count,
}) => {
  return (
    <div
      className={classNames(
        'd-flex justify-content-between align-items-center custom-collapse2-header py-1',
        isOpen ? 'custom-collapse-header-active' : ''
      )}>
      <button
        type="button"
        className="btn btn-link btn-sm p-0 m-0 me-1 text-black"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>
        <i
          className={classNames(
            'mx-1',
            isOpen
              ? 'bx bx-chevron-down text-primary'
              : 'bx bx-chevron-right text-gray'
          )}
        />
        <div className="d-flex justify-content-between align-items-center gap-2 flex-grow-1">
          <div className="d-flex justify-content-between align-items-center gap-2 flex-grow-1">
            <div className="d-flex justify-content-between align-items-center gap-1 text-black">
              {iconUrl ? (
                <img src={iconUrl} alt="" />
              ) : (
                <i
                  className={classNames(
                    'me-1',
                    icon || 'bx bx-map ',
                    iconColorClass || 'text-black'
                  )}
                />
              )}
              <span className="text-primary">{headerText}</span>
            </div>
          </div>
        </div>
      </button>
      <div className="d-flex justify-content-center align-items-center gap-0 text-black">
        <span className="circle-text-medium font-8 fw-bold text-black-50 me-1">
          {count || 0}
        </span>

        <span className="circle-medium show-hide-btn-wrapper text-black fw-bold me-1">
          <button
            type="button"
            className="btn btn-link p-0 m-0 show-hide-btn text-black"
            onClick={() => setIsHide((prevHide) => !prevHide)}>
            <i
              className={classNames(
                isHide ? 'bx bx-hide' : 'bx bx-show',
                isOpen ? 'text-primary' : 'text-gray'
              )}
            />
          </button>
        </span>
      </div>
    </div>
  );
};

export default CustomCollapse2Header;
