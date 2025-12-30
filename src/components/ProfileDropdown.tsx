/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { can } from '../helpers/checkPermission';
import ProfilePicture from '../pages/users/components/ProfilePicture';

type ProfileMenuItem = {
  label: string;
  icon: string;
  redirectTo: string;
  permission?: string;
};

type Props = {
  menuItems: ProfileMenuItem[];
  profilePic?: string | undefined;
  username: string;
  userTitle?: string;
};

const ProfileDropdown: FC<Props> = ({
  menuItems,
  profilePic,
  username,
  userTitle,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /*
   * toggle profile-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        variant="link"
        id="dropdown-profile"
        as={Link}
        to="#"
        onClick={toggleDropdown}
        className="nav-link dropdown-toggle nav-user arrow-none me-0 d-flex gap-2 justify-content-center align-items-center">
        <span className="account-user-avatar">
          <ProfilePicture
            url={profilePic}
            className="rounded-circle"
            alt="user"
          />
        </span>
        <span>
          <span className="account-user-name">{username}</span>
          <span className="account-position">{userTitle}</span>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
        <div role="menu" tabIndex={0} onClick={toggleDropdown}>
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </div>
          {menuItems.map((item: any) => {
            return Object.keys(item).includes('permission') ? (
              can(item?.permission) && (
                <Link
                  to={item?.redirectTo}
                  className="dropdown-item notify-item"
                  key={item?.label}>
                  <i className={`${item?.icon} me-1`} />
                  <span>{item?.label}</span>
                </Link>
              )
            ) : (
              <Link
                to={item?.redirectTo}
                className="dropdown-item notify-item"
                key={item?.label}>
                <i className={`${item?.icon} me-1`} />
                <span>{item?.label}</span>
              </Link>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
