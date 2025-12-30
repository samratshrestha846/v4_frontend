import {
  CHANGE_PASSWORD,
  NOTIFICATION_SETTINGS,
  RESET_PASSWORD,
  USER_PREFERENCE_SETTINGS,
  USERS,
} from '../../constants/apiUrls';

import {
  ChangeDefaultPasswordFormFields,
  UserNotificationFormFields,
  User,
  UserPreferenceFormFields,
  UserFormFields,
  UserListResponse,
  UserQueryParams,
} from '../../types/user/user';
import { prepareDynamicUrl } from '../helpers';
import { APICore } from './apiCore';

function user() {
  const apiCore = new APICore();

  return {
    fetchUsers: async (params: UserQueryParams): Promise<UserListResponse> => {
      const response = await apiCore.get(USERS, params);
      return response.data;
    },

    createUser: async (formData: UserFormFields): Promise<User> => {
      const response = await apiCore.create(USERS, formData);
      return response.data.body;
    },

    updateUser: async (formData: UserFormFields, id: number): Promise<User> => {
      const response = await apiCore.update(`${USERS}/${id}`, formData);
      return response.data.body;
    },

    getUserById: async (id: number): Promise<User> => {
      const response = await apiCore.get(`${USERS}/${id}`);
      return response.data.body;
    },

    deactivateUser: async (formData: any, id: number): Promise<User> => {
      const response = await apiCore.updatePatch(`${USERS}/${id}`, formData);
      return response.data.body;
    },

    resetUserPassword: async (formData: any, id: number): Promise<any> => {
      const response = await apiCore.create(
        prepareDynamicUrl(RESET_PASSWORD, id),
        formData
      );
      return response.data.body;
    },

    changePassword: async (
      formData: ChangeDefaultPasswordFormFields
    ): Promise<any> => {
      const response = await apiCore.create(CHANGE_PASSWORD, formData);
      return response.data.body;
    },

    notificationSettings: async (
      formData: UserNotificationFormFields
    ): Promise<any> => {
      const response = await apiCore.create(NOTIFICATION_SETTINGS, formData);
      return response.data.body;
    },

    updateUserPreferenceSettings: async (
      id: number,
      formData: UserPreferenceFormFields
    ): Promise<any> => {
      const response = await apiCore.create(
        prepareDynamicUrl(USER_PREFERENCE_SETTINGS, id),
        formData
      );
      return response.data.body;
    },
  };
}

export default user();
