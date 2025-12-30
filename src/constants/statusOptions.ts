import { STATUS_ACTIVE, STATUS_INACTIVE, STATUS_TEST_SITE } from './constants';

const OPTIONS = [
  { value: STATUS_ACTIVE, label: 'Active' },
  { value: STATUS_INACTIVE, label: 'Inactive' },
  { value: STATUS_TEST_SITE, label: 'Test Site' },
];

export const STATUS_OPTIONS = [
  { value: STATUS_ACTIVE, label: 'Active' },
  { value: STATUS_INACTIVE, label: 'Inactive' },
];

export const STATUS_OPTIONS_BOOLEAN = [
  { value: true, label: 'Active' },
  { value: false, label: 'Inactive' },
];

export const isAlarmedOptions = [
  { value: 1, label: 'Alarmed' },
  { value: 0, label: 'Not Alarmed' },
];

export const isRunningOptions = [
  { value: 1, label: 'Running' },
  { value: 0, label: 'Not Running' },
];

export const NEWS_OPTIONS_PUBLISHED = 1;
export const NEWS_OPTIONS_DRAFT = 0;

export const NEWS_LABEL_PUBLISHED = 'Published';
export const NEWS_LABEL_DRAFT = 'Draft';

export const NEWS_PUBLISH_OPTIONS = [
  { value: NEWS_OPTIONS_PUBLISHED, label: 'Publish' },
  { value: NEWS_OPTIONS_DRAFT, label: 'Draft' },
];

export const SITE_ACTIVITY_STATUS_WAITING: number = 0;
export const SITE_ACTIVITY_STATUS_SUCCESS: number = 1;
export const SITE_ACTIVITY_STATUS_LOST_COMMUNICATION: number = 2;
export const SITE_ACTIVITY_STATUS_FAILED: number = 3;

export const SITE_ACTIVITY_STATUS_OPTIONS: Record<number, string> = {
  [SITE_ACTIVITY_STATUS_WAITING]: 'Waiting',
  [SITE_ACTIVITY_STATUS_SUCCESS]: 'Success',
  [SITE_ACTIVITY_STATUS_LOST_COMMUNICATION]: 'Lost Communication',
  [SITE_ACTIVITY_STATUS_FAILED]: 'Failed',
};

export const ACTIVITY_TYPE_STARTED: string = 'started';
export const ACTIVITY_TYPE_STOPPED: string = 'stopped';
export const ACTIVITY_TYPE_UPDATED_SETTING: string = 'updated setting';
export const ACTIVITY_TYPE_UPDATED_LOCATION: string = 'updated location';
export const ACTIVITY_TYPE_FETCHED_MESSAGE_PACKET: string =
  'fetched message packet';
export const ACTIVITY_TYPE_REBOOTED_CONTROL_BOARD: string =
  'rebooted control board';
export const ACTIVITY_TYPE_DOSER_PRIMED: string = 'doser primed';

export default OPTIONS;
