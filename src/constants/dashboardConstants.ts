export const sortOptions = [
  { value: 'name-asc', label: 'Name (ASC)' },
  { value: 'name-desc', label: 'Name (DESC)' },
  { value: 'site_number-asc', label: 'Site Number (ASC)' },
  { value: 'site_number-desc', label: 'Site Number (DESC)' },
];

export const SITE_STATUS_STOPPED: number = 0;
export const SITE_STATUS_RUNNING: number = 1;
export const SITE_STATUS_ALARMED: number = 2;

export const filterOptions = [
  { value: SITE_STATUS_RUNNING, label: 'Running' },
  { value: SITE_STATUS_STOPPED, label: 'Stopped' },
  { value: SITE_STATUS_ALARMED, label: 'Alarmed' },
];

export const DASHBOARD_TAB_UDOSE = 'udose';
export const DASHBOARD_TAB_UBOT = 'ubot';

export const dashboardTabOptions = [
  { value: DASHBOARD_TAB_UDOSE, label: 'uDoses' },
  // { value: DASHBOARD_TAB_UBOT, label: 'uBots' },
];

export const ASSIGNED_TO_ME: number = 1;
