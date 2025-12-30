export const ACTIVITY_1: string = '1';
export const ACTIVITY_2: string = '2';
export const ACTIVITY_3: string = '3';
export const ACTIVITY_4: string = '4';
export const ACTIVITY_5: string = '5';
export const ACTIVITY_6: string = '6';
export const ACTIVITY_7: string = '7';

export const ACTIVITIES = {
  [ACTIVITY_1]: 'No Activity',
  [ACTIVITY_2]: 'Low Activity',
  [ACTIVITY_3]: 'Medium Activity',
  [ACTIVITY_4]: 'Medium Activity',
  [ACTIVITY_5]: 'High Activity',
  [ACTIVITY_6]: 'High Activity',
  [ACTIVITY_7]: 'Extremely High Activity',
};

export const ALERT_ACTIVITY_THRESHOLD_HIGH = 'activity_threshold_high';
export const ALERT_ACTIVITY_THRESHOLD_NONE = 'activity_threshold_none';
export const ALERT_ACTIVITY_THRESHOLD_LOW = 'activity_threshold_low';

export const ALERT_TYPES = {
  [ALERT_ACTIVITY_THRESHOLD_HIGH]: 'High Activity Alert',
  [ALERT_ACTIVITY_THRESHOLD_LOW]: 'Low Activity Alert',
  [ALERT_ACTIVITY_THRESHOLD_NONE]: 'No Activity Alert',
};

export const INDEX_0_GRAZING = 0;
export const INDEX_1_RESTING_AND_RUMINATING = 1;
export const INDEX_2_WALKING = 2;
export const INDEX_6_DRINKINGAND_UNCLASSIFIED = 6;

export const INDEX_7_DRY_MATTER_INTAKE = 7;
export const INDEX_8_METHANE_PRODUCTION = 8;

export const ANIMAL_BEHAVIOURS = {
  [INDEX_0_GRAZING]: 'Grazing',
  [INDEX_1_RESTING_AND_RUMINATING]: 'Resting & Ruminating',
  [INDEX_2_WALKING]: 'Walking',
  [INDEX_6_DRINKINGAND_UNCLASSIFIED]: 'Drinking & Others',
  [INDEX_7_DRY_MATTER_INTAKE]: 'Dry Matter Intake',
  [INDEX_8_METHANE_PRODUCTION]: 'Methane Production',
};

export const DEFAULT_ALERT_ACTIVITY_INTERVAL = 30;

export const ACCURACY_0 = 0;
export const ACCURACY_1 = 1;
export const ACCURACY_2 = 2;
export const ACCURACY_3 = 3;
export const ACCURACY_4 = 4;
export const ACCURACY_5 = 5;
export const ACCURACY_6 = 6;
export const ACCURACY_7 = 7;

export const LOCATION_ACCURACY: { [key: number]: string } = {
  [ACCURACY_0]: '<=2m',
  [ACCURACY_1]: '<=5m',
  [ACCURACY_2]: '<=10m',
  [ACCURACY_3]: '<=25m',
  [ACCURACY_4]: '<=50m',
  [ACCURACY_5]: '<=100m',
  [ACCURACY_6]: '>100m',
  [ACCURACY_7]: 'No Fix',
};

export const CERES_TAG_BRAND_CERESTRACE: string = 'CeresTrace';

export const CERES_TAG_BRAND_CERESRANCH: string = 'CeresRanch';

export const CERES_TAG_BRAND_CERESWILD: string = 'CeresWild';

export const CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_OLD: string =
  '64.1.6.0';

export const CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_NEW: string =
  '64.4.0.2';

export const CERES_TAG_FIRMWARE_VERSION_CERESWILD_OLD: string = '63.2.0.0';

export const CERES_TAG_FIRMWARE_VERSION_CERESWILD_NEW: string = '63.3.0.2';

export const CERES_TAG_HISTORICAL_DATA_FROM_BEGINNING = 'Beginning';

export const CERES_TAG_HISTORICAL_DATA_TO_TODAY = 'Today';
