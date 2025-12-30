import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

// components
import ProfileDropdown from '../../../components/ProfileDropdown';
import { APICore } from '../../../helpers/api/apiCore';
import useAuth from '../../../hooks/useAuth';
import { hasRoles } from '../../../helpers/helpers';
import SwitchingButtonList from '../../../modules/dashboard/components/PlatformSwitchingButtonList';

// eslint-disable-next-line import/no-relative-packages
import profilePic from '../../../assets/images/users/user-logo.png';
import {
  ADMIN_PROFILE_MENU,
  CUSTOMER_PROFILE_MENU,
} from '../../../constants/profileMenuConstants';

type UnifiedTopbarProps = {
  hideLogo?: boolean;
  navCssClasses?: string;
};

const UnifiedTopbar: React.FC<UnifiedTopbarProps> = ({
  hideLogo,
  navCssClasses,
}) => {
  const navbarCssClasses = navCssClasses || '';
  const containerCssClasses = !hideLogo ? 'container-fluid' : '';

  const { profilePictureUrl } = useSelector((state: any) => ({
    layoutType: state.Layout.layoutType,
    leftSideBarType: state.Layout.leftSideBarType,
    profilePictureUrl: state.Auth.user?.profile_picture_url,
  }));

  const api = new APICore();
  const user: any = api.getLoggedInUser();

  const { isAdmin, isSuperAdmin } = useAuth();

  /**
   * Toggle the leftmenu when having mobile screen
   */

  return (
    <div
      className={classNames(
        'd-flex align-items-center',
        `navbar-unified ${navbarCssClasses}`
      )}>
      <div
        className={classNames(
          containerCssClasses,
          'd-flex justify-content-between align-items-center'
        )}>
        <SwitchingButtonList />

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
      </div>
    </div>
  );
};

export default UnifiedTopbar;
