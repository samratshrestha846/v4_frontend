/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

import DIT_CONNECT_MENU_ITEMS from '@project/ditconnect/constants/menu';
import useCheckPermission from '@uhub/hooks/useCheckPermission';

import { findAllParent, findMenuItem } from '../helpers/menu';
import { useNotificationContext } from '../context/useNotificationContext';
import { MenuItem as TMenuItem } from '../types/common';
import MENU_ITEMS from '../constants/menu';

import { usePlatformContext } from '../context/usePlatformContext';
import { PLATFORM_UHUB } from '../constants/platformConstants';
import { PERMISSION_EXCLUDED_MENU } from '../constants/permissionExcludedMenu';

type MenuItemWithChildrenProps = {
  item: TMenuItem;
  linkClassName?: string;
  subMenuClassNames?: string;
  activeMenuItems: string[];
  toggleMenu?: (item: TMenuItem, status: boolean) => void;
};

const MenuItemWithChildren: React.FC<MenuItemWithChildrenProps> = ({
  item,
  linkClassName,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu,
}): any => {
  const { can } = useCheckPermission();
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));
  useEffect(() => {
    setOpen(activeMenuItems.includes(item.key));
  }, [activeMenuItems, item]);

  const toggleMenuItem = (e: any) => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };
  return (
    ((item.permission && can(item.permission)) ||
      PERMISSION_EXCLUDED_MENU.map((ele) => ele.key).includes(item.key)) && (
      <li className={classNames('side-nav-item', { 'menuitem-active': open })}>
        <Link
          to="/#"
          onClick={toggleMenuItem}
          data-menu-key={item.key}
          aria-expanded={open}
          className={classNames(
            'd-flex align-items-center has-arrow',
            'side-sub-nav-link',
            linkClassName,
            {
              'menuitem-active': activeMenuItems.includes(item.key)
                ? 'active'
                : '',
            }
          )}>
          {item.icon && <i className={item.icon} />}
          {item.customIcon && <div className="me-2">{item.customIcon} </div>}
          {!item.badge ? (
            <span className="menu-arrow" />
          ) : (
            <span
              className={classNames(
                'badge',
                `bg-${item.badge.variant}`,
                'float-end',
                {
                  'text-dark': item.badge.variant === 'light',
                }
              )}>
              {item.badge.text}
            </span>
          )}

          <span> {item.label} </span>
        </Link>
        <Collapse in={open}>
          <ul className={classNames(subMenuClassNames)}>
            {item.children?.map((child, i) => {
              return (
                ((child.permission && can(child.permission)) ||
                  PERMISSION_EXCLUDED_MENU.map((ele) => ele.key).includes(
                    child.key
                  )) && (
                  <React.Fragment key={i}>
                    {child.children ? (
                      <>
                        {/* parent */}
                        <MenuItemWithChildren
                          item={child}
                          linkClassName={
                            activeMenuItems.includes(child.key) ? 'active' : ''
                          }
                          activeMenuItems={activeMenuItems}
                          subMenuClassNames="side-nav-third-level"
                          toggleMenu={toggleMenu}
                        />
                      </>
                    ) : (
                      <>
                        {/* child */}
                        <MenuItem
                          item={child}
                          className={
                            activeMenuItems.includes(child.key)
                              ? 'menuitem-active'
                              : ''
                          }
                          linkClassName={
                            activeMenuItems.includes(child.key) ? 'active' : ''
                          }
                        />
                      </>
                    )}
                  </React.Fragment>
                )
              );
            })}
          </ul>
        </Collapse>
      </li>
    )
  );
};

type MenuItemProps = {
  item: TMenuItem;
  className: string;
  linkClassName: string;
};

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  className,
  linkClassName,
}) => {
  return (
    <li className={classNames('side-nav-item', className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};

type MenuItemLinkProps = {
  item: TMenuItem;
  className: string;
};

const MenuItemLink: React.FC<MenuItemLinkProps> = ({ item, className }) => {
  const { notificationCount } = useNotificationContext();
  return (
    <Link
      to={{ pathname: item.url }}
      target={item.target}
      className={classNames(
        'd-flex align-items-center',
        'side-nav-link-ref',
        'side-sub-nav-link',
        className
      )}
      data-menu-key={item.key}>
      {item.icon && <i className={item.icon} />}
      {item.customIcon && <div className="me-2">{item.customIcon} </div>}
      <div className="d-flex justify-content-between align-items-center flex-grow-1 gap-1">
        <span> {item.label} </span>
        {item.badge && (
          <span
            className={classNames(
              'mt-0',
              'badge',
              `bg-${item.badge.variant}`,
              'rounded-pill',
              'font-10',
              'float-end',
              {
                'text-dark': item.badge.variant === 'light',
              }
            )}>
            {item.badge.text}
            {notificationCount}
          </span>
        )}
      </div>
    </Link>
  );
};

/**
 * Renders the application menu
 */

type AppMenuProps = {
  menuItems: TMenuItem[];
};

const AppMenu: React.FC<AppMenuProps> = () => {
  const { can } = useCheckPermission();
  const [activeMenuItems, setActiveMenuItems] = useState<string[]>([]);
  const location = useLocation();
  const menuRef = useRef(null);
  const { activePlatform } = usePlatformContext();

  const menuItems =
    activePlatform.platform === PLATFORM_UHUB
      ? MENU_ITEMS
      : DIT_CONNECT_MENU_ITEMS;

  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem: TMenuItem, show: boolean) => {
    if (show)
      setActiveMenuItems([menuItem.key, ...findAllParent(menuItems, menuItem)]);
  };

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    const div = document.getElementById('main-side-menu');
    let matchingMenuItem = null;

    if (div) {
      const items: any = div.getElementsByClassName('side-nav-link-ref');
      for (let i = 0; i < items.length; ++i) {
        if (location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key');
        const activeMt = findMenuItem(menuItems, mid);
        if (activeMt) {
          setActiveMenuItems([
            activeMt.key,
            ...findAllParent(menuItems, activeMt),
          ]);
        }
      }
    }
  }, [location.pathname, menuItems]);

  useEffect(() => {
    activeMenu();
  }, [activeMenu]);

  return (
    <ul className="side-nav" ref={menuRef} id="main-side-menu">
      {menuItems?.map((item, idx) => {
        return (item.permission && can(item.permission)) ||
          PERMISSION_EXCLUDED_MENU.map((ele) => ele.key).includes(item.key) ? (
          <React.Fragment key={idx}>
            {item.isTitle ? (
              <li className="side-nav-title side-nav-item">{item.label}</li>
            ) : (
              <>
                {item.children ? (
                  <MenuItemWithChildren
                    item={item}
                    toggleMenu={toggleMenu}
                    subMenuClassNames="side-nav-second-level"
                    activeMenuItems={activeMenuItems}
                    linkClassName="side-nav-link"
                  />
                ) : (
                  <MenuItem
                    item={item}
                    linkClassName="side-nav-link"
                    className={
                      activeMenuItems.includes(item.key)
                        ? 'menuitem-active'
                        : ''
                    }
                  />
                )}
              </>
            )}
          </React.Fragment>
        ) : null;
      })}
    </ul>
  );
};

export default AppMenu;
