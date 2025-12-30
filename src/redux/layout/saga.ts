// @flow
import { all, call, fork, takeEvery, put } from 'redux-saga/effects';

import { LayoutActionTypes } from './constants';
import * as layoutConstants from '../../constants';
import {
  changeLayoutWidth as changeLayoutWidthAction,
  changeSidebarTheme as changeLeftSidebarThemeAction,
  changeSidebarType as changeSidebarTypeAction,
} from './actions';
import { LayoutAction } from '../../types/redux/store-type';

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute: string, value: any) {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
function manageBodyClass(cssClass: string, action = 'toggle') {
  switch (action) {
    case 'add':
      if (document.body) document.body.classList.add(cssClass);
      break;
    case 'remove':
      if (document.body) document.body.classList.remove(cssClass);
      break;
    default:
      if (document.body) document.body.classList.toggle(cssClass);
      break;
  }

  return true;
}

/**
 * ---------------------------------------------------------------------------------------------------------------------------
 * Note: Following are the functions which allows you to save the user prefrences on backend side by making an api request.
 * For now, we are just applying the required logic on frontend side
 * ----------------------------------------------------------------------------------------------------------------------------
 */

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeLayout(action: LayoutAction) {
  try {
    yield call(changeBodyAttribute, 'data-layout', action.payload);
    if (action.payload === layoutConstants.LAYOUT_VERTICAL) {
      yield put(
        changeLeftSidebarThemeAction(layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT)
      );
      yield put(
        changeSidebarTypeAction(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED)
      );
    }

    if (action.payload === layoutConstants.LAYOUT_HORIZONTAL) {
      yield put(
        changeLeftSidebarThemeAction(layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT)
      );
      yield put(
        changeSidebarTypeAction(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED)
      );
    }

    if (action.payload === layoutConstants.LAYOUT_DETACHED) {
      yield put(changeLayoutWidthAction(layoutConstants.LAYOUT_WIDTH_FLUID));
      yield put(
        changeSidebarTypeAction(layoutConstants.LEFT_SIDEBAR_TYPE_SCROLLABLE)
      );
      yield put(
        changeLeftSidebarThemeAction(layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT)
      );
    }
  } catch (error) {
    /* empty */
  }
}

/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidth(action: LayoutAction) {
  try {
    yield call(changeBodyAttribute, 'data-layout-mode', action.payload);
  } catch (error) {
    /* empty */
  }
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarTheme(action: LayoutAction) {
  try {
    yield call(changeBodyAttribute, 'data-leftbar-theme', action.payload);
  } catch (error) {
    /* empty */
  }
}

/**
 * Changes the left sidebar type
 * @param {*} param0
 */
function* changeLeftSidebarType(action: LayoutAction) {
  try {
    yield call(
      changeBodyAttribute,
      'data-leftbar-compact-mode',
      action.payload
    );
  } catch (error) {
    /* empty */
  }
}

/**
 * Toggles the rightsidebar
 */
function* toggleRightSidebar() {
  try {
    yield call(manageBodyClass, 'end-bar-enabled');
  } catch (error) {
    /* empty */
  }
}

/**
 * Show the rightsidebar
 */
function* showRightSidebar() {
  try {
    yield call(manageBodyClass, 'end-bar-enabled', 'add');
  } catch (error) {
    /* empty */
  }
}

/**
 * Hides the rightsidebar
 */
function* hideRightSidebar() {
  try {
    yield call(manageBodyClass, 'end-bar-enabled', 'remove');
  } catch (error) {
    /* empty */
  }
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
  yield takeEvery(LayoutActionTypes.CHANGE_LAYOUT, changeLayout);
}

export function* watchChangeLayoutWidth() {
  yield takeEvery(LayoutActionTypes.CHANGE_LAYOUT_WIDTH, changeLayoutWidth);
}

export function* watchChangeLeftSidebarTheme() {
  yield takeEvery(
    LayoutActionTypes.CHANGE_SIDEBAR_THEME,
    changeLeftSidebarTheme
  );
}

export function* watchChangeLeftSidebarType() {
  yield takeEvery(LayoutActionTypes.CHANGE_SIDEBAR_TYPE, changeLeftSidebarType);
}

export function* watchToggleRightSidebar() {
  yield takeEvery(LayoutActionTypes.TOGGLE_RIGHT_SIDEBAR, toggleRightSidebar);
}

export function* watchShowRightSidebar() {
  yield takeEvery(LayoutActionTypes.SHOW_RIGHT_SIDEBAR, showRightSidebar);
}

export function* watchHideRightSidebar() {
  yield takeEvery(LayoutActionTypes.HIDE_RIGHT_SIDEBAR, hideRightSidebar);
}

function* LayoutSaga() {
  yield all([
    fork(watchChangeLayoutType),
    fork(watchChangeLayoutWidth),
    fork(watchChangeLeftSidebarTheme),
    fork(watchChangeLeftSidebarType),
    fork(watchToggleRightSidebar),
    fork(watchShowRightSidebar),
    fork(watchHideRightSidebar),
  ]);
}

export default LayoutSaga;
