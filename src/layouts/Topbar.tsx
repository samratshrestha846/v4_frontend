/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

// actions
import { changeSidebarType } from '../redux/actions';

// components
import ProfileDropdown from '../components/ProfileDropdown';

import profilePic from '../assets/images/users/user-logo.png';
import logoSm from '../assets/images/icon-logo.svg';
import logo from '../assets/images/logo.svg';

// constants
import * as layoutConstants from '../constants/layout';

import { APICore } from '../helpers/api/apiCore';
import useAuth from '../hooks/useAuth';
import { hasRoles } from '../helpers/helpers';
import config from '../config';
import { APP_ENV_PRODUCTION } from '../constants/constants';
import SwitchingButtonList from '../modules/dashboard/components/PlatformSwitchingButtonList';
import {
  ADMIN_PROFILE_MENU,
  CUSTOMER_PROFILE_MENU,
} from '../constants/profileMenuConstants';

type TopbarProps = {
  hideLogo?: boolean;
  navCssClasses?: string;
  openLeftMenuCallBack?: () => void;
  topbarDark?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({
  hideLogo,
  navCssClasses,
  openLeftMenuCallBack,
  topbarDark,
}) => {
  const dispatch = useDispatch();
  const [isopen, setIsopen] = useState(false);
  const { isCustomer, isStationManager } = useAuth();

  const navbarCssClasses = navCssClasses || '';
  const containerCssClasses = !hideLogo ? 'container-fluid' : '';

  const { layoutType, leftSideBarType, profilePictureUrl } = useSelector(
    (state: any) => ({
      layoutType: state.Layout.layoutType,
      leftSideBarType: state.Layout.leftSideBarType,
      profilePictureUrl: state.Auth.user?.profile_picture_url,
    })
  );

  const api = new APICore();
  const user: any = api.getLoggedInUser();

  const { isAdmin, isSuperAdmin } = useAuth();

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    setIsopen((prevState) => !prevState);
    if (openLeftMenuCallBack) openLeftMenuCallBack();

    switch (layoutType) {
      case layoutConstants.LAYOUT_VERTICAL:
        if (window.innerWidth >= 768) {
          if (leftSideBarType === 'fixed' || leftSideBarType === 'scrollable')
            dispatch(
              changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED)
            );
          if (leftSideBarType === 'condensed')
            dispatch(
              changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED)
            );
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={`navbar-custom ${navbarCssClasses}`}>
      <div
        className={classNames(
          containerCssClasses,
          'd-flex justify-content-between align-items-center'
        )}>
        <div className="d-flex justify-content-start align-items-center gap-1">
          {/* toggle for vertical layout */}
          {layoutType === layoutConstants.LAYOUT_VERTICAL && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              className="button-menu-mobile open-left"
              onClick={handleLeftMenuCallBack}
              type="button">
              <i className="mdi mdi-menu" />
            </button>
          )}
          {!(isCustomer || isStationManager) && <SwitchingButtonList />}
        </div>

        {!hideLogo && (
          <Link to="/" className="topnav-logo">
            <span className="topnav-logo-lg">
              <img src={logo} alt="logo" height="45" />
            </span>
            <span className="topnav-logo-sm">
              <img src={topbarDark ? logoSm : logoSm} alt="logo" height="55" />
            </span>
          </Link>
        )}

        <ul className="list-unstyled topbar-menu float-end mb-0">
          <li className="dropdown notification-list">
            <ProfileDropdown
              profilePic={profilePictureUrl ?? profilePic}
              menuItems={
                isAdmin || isSuperAdmin
                  ? ADMIN_PROFILE_MENU
                  : CUSTOMER_PROFILE_MENU
              }
              username={user?.first_name}
              userTitle={hasRoles(user) && user?.roles[0]?.name}
            />
          </li>
        </ul>

        {/* toggle for horizontal layout */}
        {layoutType === layoutConstants.LAYOUT_HORIZONTAL && (
          <Link
            to="#"
            className={classNames('navbar-toggle', { open: isopen })}
            onClick={handleLeftMenuCallBack}>
            <div className="lines">
              <span />
              <span />
              <span />
            </div>
          </Link>
        )}

        {/* toggle for detached layout */}
        {layoutType === layoutConstants.LAYOUT_DETACHED && (
          <Link
            to="#"
            className="button-menu-mobile disable-btn"
            onClick={handleLeftMenuCallBack}>
            <div className="lines">
              <span />
              <span />
              <span />
            </div>
          </Link>
        )}
      </div>
      <div className="test-server">
        {config.APP_ENV !== APP_ENV_PRODUCTION && (
          <h6 className="m-0">Test uHUB</h6>
        )}
      </div>
    </div>
  );
};

export default Topbar;
