// @flow
import { CERESTAG_LOGIN, CHANGE_PASSWORD } from '../../constants/apiUrls';
import { ChangeDefaultPasswordFormFields } from '../../types/user/user';
import { APICore } from './apiCore';

const api = new APICore();

// account
function login(params: any): any {
  const baseUrl = '/login';
  return api.create(`${baseUrl}`, params);
}

// authenticate ceresTag customer user
function ceresTagLogin(params: any): any {
  return api.create(CERESTAG_LOGIN, params);
}

function logout(): any {
  const baseUrl = '/logout/';
  return api.create(`${baseUrl}`, {});
}

function signup(params: any): any {
  const baseUrl = '/register/';
  return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: any): any {
  const baseUrl = '/password/forget';
  return api.create(`${baseUrl}`, params);
}

function forgotPasswordConfirm(params: any): any {
  const baseUrl = '/password/reset/confirm/';
  return api.create(`${baseUrl}`, params);
}

const authenticatedUser = () => {
  return api.getLoggedInUser();
};

// verify OTP
function verifyOtp(params: any): any {
  const baseUrl = `/login/one-time-code/${params.otpToken}`;
  return api.create(`${baseUrl}`, params);
}

// change profile picture
function updateProfilePicture(params: any): any {
  return api.createWithFile('/users/profile-picture/update', params);
}

// refresh profile picture url
function refreshProfilePictureUrl(params: any) {
  return api.get('/file-paths', params);
}

async function changeDefaultPassword(
  formData: ChangeDefaultPasswordFormFields
): Promise<any> {
  const response = await api.create(CHANGE_PASSWORD, formData);
  return response.data.body;
}

export {
  login,
  logout,
  signup,
  forgotPassword,
  forgotPasswordConfirm,
  authenticatedUser,
  verifyOtp,
  updateProfilePicture,
  refreshProfilePictureUrl,
  ceresTagLogin,
  changeDefaultPassword,
};
