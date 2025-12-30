import { useSelector } from 'react-redux';
import DIT_CONNECT_MENU_ITEMS from '@project/ditconnect/constants/menu';
import MENU_ITEMS from '../constants/menu';
import { hasRoles } from './helpers';
import initialStoreState from '../types/redux/store-type';
import { MenuItem } from '../types/common';

const getMenuItems = () => {
  const user = useSelector((state: initialStoreState) => state.Auth.user);
  if (!hasRoles(user)) return [];
  if (DIT_CONNECT_MENU_ITEMS) {
    return MENU_ITEMS.concat(DIT_CONNECT_MENU_ITEMS);
  }
  return MENU_ITEMS;
};

const findMenuItem = (
  menuItems: MenuItem[] | undefined,
  menuItemKey: string | undefined
): MenuItem | null => {
  if (menuItems && menuItemKey) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      const found: MenuItem | null = findMenuItem(
        menuItems[i].children,
        menuItemKey
      );
      if (found) return found;
    }
  }
  return null;
};

const findAllParent = (menuItems: MenuItem[], menuItem: MenuItem) => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem?.parentKey);

  if (parent) {
    parents.push(parent?.key);
    if (parent.parentKey)
      parents = [...parents, ...findAllParent(menuItems, parent)];
  }
  return parents;
};

export { getMenuItems, findAllParent, findMenuItem };
