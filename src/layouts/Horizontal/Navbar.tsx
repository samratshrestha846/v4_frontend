// @flow
import React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-bootstrap';
import AppMenu from './Menu';

import { getMenuItems } from '../../helpers/menu';

type NavbarProps = {
  isMenuOpened?: boolean;
};

const Navbar = ({ isMenuOpened }: NavbarProps) => {
  // change the inputTheme value to light for creative theme
  const inputTheme = 'dark';

  return (
    <div className="topnav">
      <div className="container-fluid">
        <nav
          className={classNames(
            'navbar',
            'navbar-expand-lg',
            'topnav-menu',
            `navbar-${inputTheme}`
          )}>
          <Collapse in={isMenuOpened} className="navbar-collapse">
            <div>
              <AppMenu menuItems={getMenuItems()} />
            </div>
          </Collapse>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
