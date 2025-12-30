// @flow
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import { DIT_CONNECT_DASHBOARD } from '@project/ditconnect/constants/path';

// menus
import { getMenuItems } from '../helpers/menu';

// components
import AppMenu from './Menu';

// images
import logoSm from '../assets/images/icon-logo.svg';
import logo from '../assets/images/logo.svg';
import ditConnectLogo from '../assets/images/dit-connect-logo.png';
import ditConnectLogoFull from '../assets/images/dit-connect-logo-full.png';

import { usePlatformContext } from '../context/usePlatformContext';
import {
  PLATFORM_DITCONNECT,
  PLATFORM_UHUB,
} from '../constants/platformConstants';

import { UHUB_DASHBOARD } from '../constants/path';

const SideBarContent = () => {
  return (
    <>
      <AppMenu menuItems={getMenuItems()} />
      <div className="clearfix" />
    </>
  );
};

type LeftSidebarProps = {
  hideLogo?: boolean;
  isCondensed?: boolean;
};

const LeftSidebar = ({
  isCondensed = false,
  hideLogo = false,
}: LeftSidebarProps) => {
  const menuNodeRef: any = useRef(null);
  const { activePlatform } = usePlatformContext();
  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e: any) => {
    if (
      menuNodeRef &&
      menuNodeRef.current &&
      menuNodeRef.current.contains(e.target)
    )
      return;
    // else hide the menubar
    if (document.body) {
      document.body.classList.remove('sidebar-enable');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOtherClick, false);

    return () => {
      document.removeEventListener('mousedown', handleOtherClick, false);
    };
  }, []);

  return (
    <div className="leftside-menu" ref={menuNodeRef}>
      {!hideLogo && activePlatform.platform === PLATFORM_UHUB && (
        <>
          <Link to={UHUB_DASHBOARD} className="logo text-center logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="logo" height="35" />
            </span>
          </Link>

          <Link to={UHUB_DASHBOARD} className="logo text-center logo-dark">
            <span className="logo-lg">
              <img src={logo} alt="logo" height="40" />
            </span>
            <span className="logo-sm">
              <img src={logoSm} alt="logo" height="35" />
            </span>
          </Link>
        </>
      )}

      {!hideLogo && activePlatform.platform === PLATFORM_DITCONNECT && (
        <>
          <Link
            to={DIT_CONNECT_DASHBOARD}
            className="logo text-center logo-light">
            <span className="logo-sm">
              <img src={ditConnectLogo} alt="logo" height="35" />
            </span>
          </Link>

          <Link
            to={DIT_CONNECT_DASHBOARD}
            className="logo text-center logo-dark">
            <span className="logo-lg">
              <img src={ditConnectLogoFull} alt="logo" height="40" />
            </span>
            <span className="logo-sm">
              <img src={ditConnectLogo} alt="logo" height="35" />
            </span>
          </Link>
        </>
      )}

      {!isCondensed && (
        <SimpleBar
          style={{ maxHeight: '100%' }}
          timeout={500}
          scrollbarMaxSize={320}>
          <SideBarContent />
        </SimpleBar>
      )}
      {isCondensed && <SideBarContent />}
    </div>
  );
};

export default LeftSidebar;
