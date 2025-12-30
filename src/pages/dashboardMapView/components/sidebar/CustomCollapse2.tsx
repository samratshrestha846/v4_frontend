/* eslint-disable no-unused-vars */

import React, { ReactNode, SetStateAction, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';
import CustomCollapse2Header from './CustomCollapse2Header';

type CustomCollapseProps = {
  headerText?: string;
  children?: ReactNode;
  iconUrl?: string;
  icon?: string;
  iconColorClass?: string;
  count?: number;
  isHide: boolean;
  setIsHide: React.Dispatch<SetStateAction<boolean>>;
};

const CustomCollapse2: React.FC<CustomCollapseProps> = ({
  headerText,
  children,
  iconUrl,
  icon,
  iconColorClass,
  count,
  isHide,
  setIsHide,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="d-flex- justify-content-center align-items-center">
      <CustomCollapse2Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isHide={isHide}
        setIsHide={setIsHide}
        headerText={headerText}
        icon={icon}
        iconColorClass={iconColorClass}
        iconUrl={iconUrl}
        count={count}
      />
      <Collapse in={isOpen}>
        <div>{children}</div>
      </Collapse>
    </div>
  );
};

export default CustomCollapse2;
