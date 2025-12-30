/* eslint-disable no-unused-vars */
import React, { ReactNode, SetStateAction, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';
import CustomCollapseHeader from './CustomCollapseHeader';

type CustomCollapseProps = {
  headerText?: string;
  children?: ReactNode;
  isHide: boolean;
  setIsHide: React.Dispatch<SetStateAction<boolean>>;
};

const CustomCollapse: React.FC<CustomCollapseProps> = ({
  headerText,
  children,
  isHide,
  setIsHide,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-1 menu-wrapper">
      <div className="d-flex- justify-content-center align-items-center">
        <CustomCollapseHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isHide={isHide}
          setIsHide={setIsHide}
          headerText={headerText}
        />
        <Collapse in={isOpen}>
          <div
            className={classNames(
              'p-1',
              isOpen ? 'custom-collapse-active' : ''
            )}>
            {children}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default CustomCollapse;
