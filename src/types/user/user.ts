import { Customer } from '../customer/customerList';
import { GeneralResponse } from '../generalResponse';
import { Log } from '../log/logList';
import { Permission } from '../permission/permissionList';
import { Property } from '../property/propertyList';
import { Referrer } from '../referrer/referrerList';
import Role from '../role/role';

type NotificationSetting = {
  id?: number;
  user_id: number;
  is_turned_on: number;
  preference: string[];
  type: string;
  created_at?: string;
  updated_at?: string;
};

type Preference = {
  id: number;
  key: string;
  value: string;
  user_id: number;
  created_at: Date | null;
  updated_at: Date;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_picture: string | null;
  profile_picture_url: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  roles: Role[];
  log: Log[];
  preferences: Preference[];
  notification_settings: NotificationSetting[];
  last_active: Date | null;
  customer: Customer | null;
  customer_id: number | null;
  permissions: Permission[];
  customer_properties?: Property[];
  name: string;
};

type DitAuthUser = User & {
  customer_properties: Property[];
  referrer: Referrer | null;
  token: string;
  platforms?: string[];
};

type ChangeDefaultPasswordFormFields = {
  email: string;
  old_password: string;
  pawword: string;
  password_confirmation: string;
};

type UserNotificationFormFields = {
  user_id: number;
  settings: NotificationSetting[];
};

type UserPreferenceFormFields = {
  preferences: { key: string; value: string }[];
};

type UserVerificationFormFields = {
  code: string;
  otpToken: string;
  email: string;
};

type DitUser = {
  id: 2;
  name: string;
  email: string;
  status: string;
  email_verified_at: string | null;
  password: string;
  remember_token: string;
  created_at: string | null;
  updated_at: string | null;
  role: string;
  fcm_topic: string;
  mobile_number: string;
  position: string;
  department: string;
};

type UserQueryParams = {
  page: number;
  search?: string;
  role_id?: number;
  status?: string;
};

type UserFormFields = {
  email: string;
  first_name: string;
  last_name: string;
  role_id: number;
  customer_id?: number;
  phone_number?: string;
};

interface UserListResponse extends GeneralResponse<User[]> {
  body: User[];
}

type ResetPasswordFormFields = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

export type {
  User,
  DitAuthUser,
  ChangeDefaultPasswordFormFields,
  DitUser,
  NotificationSetting,
  UserNotificationFormFields,
  UserPreferenceFormFields,
  Preference,
  UserQueryParams,
  UserFormFields,
  UserListResponse,
  ResetPasswordFormFields,
  UserVerificationFormFields,
};
