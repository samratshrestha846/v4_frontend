// @flow
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
  login as loginApi,
  ceresTagLogin as ceresTagLoginApi,
  logout as logoutApi,
  signup as signupApi,
  forgotPassword as forgotPasswordApi,
  forgotPasswordConfirm,
  verifyOtp as verifyOtpApi,
  updateProfilePicture as updateProfilePictureApi,
  refreshProfilePictureUrl as refreshProfilePictureUrlApi,
} from '../../helpers';

import { APICore } from '../../helpers/api/apiCore';
import { authApiResponseSuccess, authApiResponseError } from './actions';
import AuthActionTypes from './constants';

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({
  payload: { username, password },
}: {
  payload: { username: string; password: string };
}): any {
  try {
    const response = yield call(loginApi, { username, password });
    if (response.data.body.code_context === 'verify_mfa') {
      const token = yield response.data.body.token;
      yield put(
        authApiResponseSuccess(AuthActionTypes.VERIFY_OTP_START, {
          email: username,
          otpToken: token,
        })
      );
    } else {
      const user = response.data.body;
      // NOTE - You can change this according to response format from your api
      api.setLoggedInUser(user);
      yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
    }
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    api.setLoggedInUser(null);
  }
}

/**
 * Authenticate the ceres tag customer user
 * @param {*} payload - username and password
 */
function* ceresTagLogin({
  payload: { username, password },
}: {
  payload: { username: string; password: string };
}): any {
  try {
    const response = yield call(ceresTagLoginApi, { username, password });
    const user = response.data.body;
    yield put(
      authApiResponseSuccess(AuthActionTypes.CERESTAG_USER_LOGIN, user)
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.CERESTAG_USER_LOGIN, error));
    api.setLoggedInUser(null);
  }
}

/**
 * Logout the user
 */
function* logout(): any {
  try {
    yield call(logoutApi);
    api.setLoggedInUser(null);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
  }
}

function* signup({
  payload: { fullname, email, password },
}: {
  payload: { fullname: string; email: string; password: string };
}): any {
  try {
    const response = yield call(signupApi, { fullname, email, password });
    const user = response.data;
    // api.setLoggedInUser(user);
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
    api.setLoggedInUser(null);
  }
}

function* forgotPassword({
  payload: { username },
}: {
  payload: { username: string };
}): any {
  try {
    const response = yield call(forgotPasswordApi, { email: username });
    yield put(
      authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data)
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
  }
}

function* forgotPasswordChange({
  payload: { data },
}: {
  payload: { data: any };
}): any {
  try {
    const response = yield call(forgotPasswordConfirm, data);
    yield put(
      authApiResponseSuccess(
        AuthActionTypes.FORGOT_PASSWORD_CHANGE,
        response.data
      )
    );
  } catch (error: any) {
    yield put(
      authApiResponseError(AuthActionTypes.FORGOT_PASSWORD_CHANGE, error)
    );
  }
}

function* verifyOtp({
  payload: { email, code, otpToken },
}: {
  payload: { email: string; code: string; otpToken: any };
}): any {
  try {
    const response = yield call(verifyOtpApi, { email, code, otpToken });
    const user = response.data.body;
    // NOTE - You can change this according to response format from your api
    api.setLoggedInUser(user);
    yield put(authApiResponseSuccess(AuthActionTypes.VERIFY_OTP, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.VERIFY_OTP, error));
    api.setLoggedInUser(null);
  }
}

function* updateProfilePicture({
  payload: { data },
}: {
  payload: { data: any };
}): any {
  try {
    const response = yield call(updateProfilePictureApi, data);
    const image: any = {};
    image.profile_picture_url = response.data.body.profile_picture_url;
    image.profile_picture = response.data.body.profile_picture;
    const loggedInUser = api.getLoggedInUser();
    loggedInUser.profile_picture_url = response.data.body.profile_picture_url;
    loggedInUser.profile_picture = response.data.body.profile_picture;
    api.setLoggedInUser(loggedInUser);
    yield put(
      authApiResponseSuccess(AuthActionTypes.UPDATE_PROFILE_PICTURE, image)
    );
  } catch (error: any) {
    yield put(
      authApiResponseError(AuthActionTypes.UPDATE_PROFILE_PICTURE, error)
    );
  }
}

function* refreshProfilePictureUrl({
  payload: { data },
}: {
  payload: { data: any };
}): any {
  try {
    const response = yield call(refreshProfilePictureUrlApi, data);
    const newUrl = response.data.body.url;
    const loggedInUser = api.getLoggedInUser();
    loggedInUser.profile_picture_url = response.data.body.url;
    api.setLoggedInUser(loggedInUser);
    yield put(
      authApiResponseSuccess(
        AuthActionTypes.REFRESH_PROFILE_PICTURE_URL,
        newUrl
      )
    );
  } catch (error: any) {
    yield put(
      authApiResponseError(AuthActionTypes.REFRESH_PROFILE_PICTURE_URL, error)
    );
  }
}

export function* watchLoginUser(): any {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchCeresTagLogin(): any {
  yield takeEvery(AuthActionTypes.CERESTAG_USER_LOGIN, ceresTagLogin);
}

export function* watchVerifyOtpUser(): any {
  yield takeEvery(AuthActionTypes.VERIFY_OTP, verifyOtp);
}

export function* watchLogout(): any {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchForgotPasswordChange(): any {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD_CHANGE, forgotPasswordChange);
}

export function* watchUpdateProfilePicture(): any {
  yield takeEvery(AuthActionTypes.UPDATE_PROFILE_PICTURE, updateProfilePicture);
}

export function* watchRefreshProfilePictureUrl(): any {
  yield takeEvery(
    AuthActionTypes.REFRESH_PROFILE_PICTURE_URL,
    refreshProfilePictureUrl
  );
}

function* authSaga(): any {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchForgotPassword),
    fork(watchForgotPasswordChange),
    fork(watchVerifyOtpUser),
    fork(watchUpdateProfilePicture),
    fork(watchRefreshProfilePictureUrl),
    fork(watchCeresTagLogin),
  ]);
}

export default authSaga;
