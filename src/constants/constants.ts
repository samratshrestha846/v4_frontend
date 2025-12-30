import { LabelValueDropdown, PaginationPerPageOptions } from '../types/common';
import { DoserCommunicationMessage } from '../types/device/device';

/**
 * Roles
 */
const ROLE_SUPER_ADMIN = 'Super Admin';
const ROLE_ADMIN = 'Admin';
const ROLE_MANAGER = 'Manager';
const ROLE_CUSTOMER = 'Customer';
const ROLE_STATION_MANAGER = 'Station Manager';
const ROLE_REPORTER = 'Reporter';
/** ************************************ */

/**
 * Device Configuration Types
 */
const DEVICE_CONFIGURATION_TYPE_UDOSE: string = 'udose';
const DEVICE_CONFIGURATION_TYPE_TANK: string = 'tank';
const DEVICE_CONFIGURATION_TYPE_UBOT: string = 'ubot';
const DEVICE_CONFIGURATION_TYPE_UDOSE_AG: string = 'uDOSE AG';

const DEVICE_CONFIGURATION_NAME_UDOSE_MINI: string = 'uDose Mini';
const DEVICE_CONFIGURATION_TYPE_UDOSE_MINI: string = 'udose mini';
/** ************************************ */

/**
 * Sites
 * const TEST_SITE_STATUS:number = 2; should be removed after managing CRUD functionality of Udose Mini :Bheem
 */
const TEST_SITE_STATUS: number = 2;
const SITE_MODE_ADD: string = 'add';
const SITE_MODE_EDIT: string = 'edit';
/** ************************************ */

/**
 * Permissions
 */
const EDIT_UDOSE_SETTING: string = 'edit_udose_settings';
/** ************************************ */

/**
 * Boolean Status
 */
export const BOOLEAN_STATUS_ACTIVE: boolean = true;
export const BOOLEAN_STATUS_INACTIVE: boolean = false;

export const BOOLEAN_STATUS_OPTIONS = [
  { label: 'Active', value: BOOLEAN_STATUS_ACTIVE },
  { label: 'Inactive', value: BOOLEAN_STATUS_INACTIVE },
];

export const DEFAULT_NUTRIENT_ROWS = 4;

/**
 * Status
 */
const STATUS_ACTIVE: number = 1;
const STATUS_INACTIVE: number = 0;
const STATUS_TEST_SITE: number = 2;

const STATUS_LABEL_ACTIVE: string = 'Active';
const STATUS_LABEL_INACTIVE: string = 'Inactive';
const STATUS_LABEL_TEST_SITE: string = 'Test Site';

/**
 * YES, NO Status
 */
export const STATUS_VALUE_YES = 1;
export const STATUS_VALUE_NO = 0;

export const STATUS_LABEL_YES: string = 'Yes';
export const STATUS_LABEL_NO: string = 'No';

/** ************************************ */

const UDOSE_FOLLOWUP_STATUS_TODO: string = 'to_do';
const UDOSE_FOLLOWUP_STATUS_COMPLETED: string = 'completed';

const UDOSE_SITE_FOLLOWUP_STATUS_OPTIONS = [
  {
    value: UDOSE_FOLLOWUP_STATUS_TODO,
    label: 'To Do',
  },
  {
    value: UDOSE_FOLLOWUP_STATUS_COMPLETED,
    label: 'Completed',
  },
];

export const SITE_FOLLOWUP_ACTION_REQUIRED_OPTIONS = [
  {
    value: 'Review',
    label: 'Review',
  },
  {
    value: 'Attend',
    label: 'Attend',
  },
];

/**
 * Model
 */
export const SITE = 'site';
export const DEVICE = 'device';
export const USER = 'user';

export const APP_ENV_PRODUCTION = 'production';

export const SORTING_ORDER_ASC = 'asc';
export const SORTING_ORDER_DESC = 'desc';

export const PAGINATION_PAGE_RANGE_DISPLAYED = 3;
export const PAGINATION_MARGIN_PAGES_DISPLAYED = 3;
export const PAGINATION_PAGE_NUMBER_0 = 0;
export const PAGINATION_PAGE_SIZE = 10;

export const PAGINATION_PER_PAGE_5 = 5;
export const PAGINATION_PER_PAGE_10 = 10;
export const PAGINATION_PER_PAGE_20 = 20;
export const PAGINATION_PER_PAGE_30 = 30;

export const PAGINATION_PER_PAGE_OPTIONS: PaginationPerPageOptions[] = [
  { value: PAGINATION_PER_PAGE_5, label: PAGINATION_PER_PAGE_5 },
  { value: PAGINATION_PER_PAGE_10, label: PAGINATION_PER_PAGE_10 },
  { value: PAGINATION_PER_PAGE_20, label: PAGINATION_PER_PAGE_20 },
  { value: PAGINATION_PER_PAGE_30, label: PAGINATION_PER_PAGE_30 },
];

export const PAGINATION_DEFAULT = {
  from: 0,
  to: 0,
  total: 0,
  last_page: 0,
};

export const DEVICE_LOG_ACTION_INSTALLED = 'Installed';
export const DEVICE_LOG_ACTION_UNINSTALLED = 'Removed';

export const DEVICE_LOG_ACTION_OPTIONS = [
  { value: DEVICE_LOG_ACTION_INSTALLED, label: 'Installed' },
  { value: DEVICE_LOG_ACTION_UNINSTALLED, label: 'Uninstalled' },
];

export const LABEL_YES = 'Yes';
export const LABEL_NO = 'No';

// Doser status

export const DOSER_STATUS_STOPPED = 'Stopped';
export const DOSER_STATUS_RUNNING = 'Running';
export const DOSER_STATUS_ALARMED = 'Alarmed';
export const DOSER_STATUS_NOT_COMMUNICATED = 'Not Communicated';

// Water flow status in 10 hours
export const WATER_FLOW_STATUS_WARNING = 'Warning';
export const WATER_FLOW_STATUS_OK = 'Ok';

// Site latest health check status
export const SITE_HEALTH_STATUS_WARNING = 'Warning';
export const SITE_HEALTH_STATUS_OK = 'Ok';
export const SITE_HEALTH_STATUS_SEVERE = 'Severe';

// Tank runout days limit
export const TANK_RUNOUT_LEVEL_DANGER = 3;
export const TANK_RUNOUT_LEVEL_WARNING = 15;

// Calculation types - cost feed analysis
export const COST_FEED_CALCULATOR = 'cost_feed_calculator';
export const DOSE_RATE_CALCULATOR = 'dose_rate_calculator';

export const CALCULATOR_TYPE_OPTIONS = [
  // { label: 'Cost Feed Calculator', value: COST_FEED_CALCULATOR },
  { label: 'Dose Rate Calculator', value: DOSE_RATE_CALCULATOR },
];

export const DOSER_COMMUNICATION_MESSAGES: Record<
  string,
  DoserCommunicationMessage
> = {
  [DOSER_STATUS_ALARMED]: {
    variant: 'alert-bg-danger',
    message: 'Doser is Alarmed.',
    alarmedMessage: '',
    icon: 'bx bx-alarm',
    iconColorClass: 'text-danger',
  },
  [DOSER_STATUS_RUNNING]: {
    variant: 'alert-bg-success',
    message: 'Doser is Running.',
    alarmedMessage: '',
    icon: 'bx bxs-check-circle',
    iconColorClass: 'text-success',
  },
  [DOSER_STATUS_STOPPED]: {
    variant: 'alert-bg-secondary',
    message: 'Doser is Stopped.',
    alarmedMessage: '',
    icon: 'bx bx-stop-circle',
    iconColorClass: 'text-secondary-color',
  },

  [DOSER_STATUS_NOT_COMMUNICATED]: {
    variant: 'alert-bg-skyblue',
    message: 'Doser has not communicated in last 24 hours.',
    alarmedMessage: '',
    icon: 'bx bx-info-circle',
    iconColorClass: 'text-info',
  },
};

export const ALARM_SEVERITY_LEVEL_CAUTION = 'Caution';
export const ALARM_SEVERITY_LEVEL_ALERT = 'Alert';
export const ALARM_SEVERITY_LEVEL_ALARM = 'Alarm';

export const ALARM_SEVERITY_LEVELS: Record<
  string,
  {
    level?: string;
    bgColor?: string;
    iconColor?: string;
  }
> = {
  [ALARM_SEVERITY_LEVEL_CAUTION]: {
    level: ALARM_SEVERITY_LEVEL_CAUTION,
    bgColor: 'alert-bg-warning',
    iconColor: 'text-warning',
  },
  [ALARM_SEVERITY_LEVEL_ALERT]: {
    level: ALARM_SEVERITY_LEVEL_ALERT,
    bgColor: 'alert-bg-orange',
    iconColor: 'text-orange',
  },
  [ALARM_SEVERITY_LEVEL_ALARM]: {
    level: ALARM_SEVERITY_LEVEL_ALARM,
    bgColor: 'alert-bg-danger',
    iconColor: 'text-danger',
  },
};

export const EXTERNAL_VISIBILITY_YES = 1;
export const EXTERNAL_VISIBILITY_NO = 0;

export {
  ROLE_SUPER_ADMIN,
  ROLE_ADMIN,
  ROLE_MANAGER,
  ROLE_CUSTOMER,
  ROLE_STATION_MANAGER,
  ROLE_REPORTER,
  DEVICE_CONFIGURATION_TYPE_UDOSE,
  DEVICE_CONFIGURATION_TYPE_TANK,
  DEVICE_CONFIGURATION_TYPE_UBOT,
  DEVICE_CONFIGURATION_TYPE_UDOSE_AG,
  TEST_SITE_STATUS,
  DEVICE_CONFIGURATION_NAME_UDOSE_MINI,
  DEVICE_CONFIGURATION_TYPE_UDOSE_MINI,
  SITE_MODE_ADD,
  SITE_MODE_EDIT,
  EDIT_UDOSE_SETTING,
  STATUS_ACTIVE,
  STATUS_INACTIVE,
  STATUS_TEST_SITE,
  UDOSE_FOLLOWUP_STATUS_TODO,
  UDOSE_FOLLOWUP_STATUS_COMPLETED,
  UDOSE_SITE_FOLLOWUP_STATUS_OPTIONS,
  STATUS_LABEL_ACTIVE,
  STATUS_LABEL_INACTIVE,
  STATUS_LABEL_TEST_SITE,
};

export const DOSER_ACTION_LABEL_STOP = 'Stop';
export const DOSER_ACTION_LABEL_START = 'Start';

export const DOSER_ACTION_STOP = 0;
export const DOSER_ACTION_START = 1;
export const DOSER_ACTION_MANUALLY_STOP = 2;

export const DOSER_STOP_REASON_OPTIONS: LabelValueDropdown[] = [
  { label: 'Tech Issues', value: 'Tech Issues' },
  { label: 'Rainfall', value: 'Rainfall' },
  { label: 'Budget Concerns', value: 'Budget Concerns' },
  { label: 'Cattle Movement', value: 'Cattle Movement' },
  { label: 'Good Pasture Quality', value: 'Good Pasture Quality' },
  { label: 'Others', value: 'Others' },
];

export const DOSER_COMMUNICATION_MESSAGE_DISPLAY_LENGTH = 70;

export const DIGIT_AFTER_DECIMAL = 0;

// To Fixed after decimal - carbon accounting

export const DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT = 2;

export const DIGIT_AFTER_DECIMAL_IN_SUPPLEMENT_FEED = 2;

export const SUPPLEMENT_FEED_UNIT_ML = 'ml';

// Water, Nutrient, Fertilizer color

export const WATER_COLOR: string = '#20BDE7';

export const NUTRIENT_COLOR: string = '#ffbc00';

export const NUTRIENT_TARGET_DOSE_COLOR: string = '#775dd0';

export const FERTILIZER_COLOR = '#82C342';

//  Battery and Solar Voltage color

export const BATTERY_VOLTAGE_COLOR: string = '#5d91f8';

export const SOLOR_VOLTAGE_COLOR: string = '#fff002';

export const ENABLED_LABEL: string = 'Enabled';
export const DISABLED_LABEL: string = 'Disabled';
