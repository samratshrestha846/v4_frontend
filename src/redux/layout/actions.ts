// @flow
import { LayoutAction } from '../../types/redux/store-type';
import { LayoutActionTypes } from './constants';

export const changeLayout = (layout: string): LayoutAction => ({
  type: LayoutActionTypes.CHANGE_LAYOUT,
  payload: layout,
});

export const changeLayoutWidth = (width: string): LayoutAction => ({
  type: LayoutActionTypes.CHANGE_LAYOUT_WIDTH,
  payload: width,
});

export const changeSidebarTheme = (theme: string): LayoutAction => ({
  type: LayoutActionTypes.CHANGE_SIDEBAR_THEME,
  payload: theme,
});

export const changeSidebarType = (sidebarType: string): LayoutAction => ({
  type: LayoutActionTypes.CHANGE_SIDEBAR_TYPE,
  payload: sidebarType,
});

export const toggleRightSidebar = (): LayoutAction => ({
  type: LayoutActionTypes.TOGGLE_RIGHT_SIDEBAR,
  payload: null,
});

export const showRightSidebar = (): LayoutAction => ({
  type: LayoutActionTypes.SHOW_RIGHT_SIDEBAR,
  payload: null,
});

export const hideRightSidebar = (): LayoutAction => ({
  type: LayoutActionTypes.HIDE_RIGHT_SIDEBAR,
  payload: null,
});
