import { DIT_CONNECT } from '../../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const TRAVEL_DIARY_LIST = `${DIT_CONNECT}/travel-diary/list`;
export const TRAVEL_DIARY_ADD = `${DIT_CONNECT}/travel-diary/add`;
export const TRAVEL_DIARY_VIEW = `${DIT_CONNECT}/travel-diary/view/:id`;

/** /////// End PATHS //////// */
export const TRAVEL_DIARY = '/v2/travel-diaries';
export const TRAVEL_DIARY_EXPORT_ENDPOINT = '/v2/export/travel-diaries';
export const TRAVEL_DIARY_READ_ODOMETER_READING =
  'v2/travel-diaries/:id/vehicle';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_TRAVEL_DIARY: string = 'access_travel_diary';
export const CREATE_TRAVEL_DIARY: string = 'create_travel_diary';
export const UPDATE_TRAVEL_DIARY: string = 'update_travel_diary';
export const READ_TRAVEL_DIARY: string = 'read_travel_diary';
export const EXPORT_TRAVEL_DIARY: string = 'export_travel_diary';

/** ************************* */
/*    DEFAULT VALUES           */
/** ************************* */

export const TRAVEL_DIARY_DEFAULT_VALUES = {
  vehicle_id: null,
  date: null,
  start_time: null,
  end_time: null,
  total_kms: 0,
  start_odometer_reading: 0,
  end_odometer_reading: 0,
  total_flying_hours: 0,
  rnd_flying_hours: 0,
  non_rnd_flying_hours: 0,
  work_kms: 0,
  personal_kms: 0,
  rnd_distance: 0,
  non_rnd_distance: 0,
  public_road_distance: 0,
  private_road_distance: 0,
  notes: null,
  customer_property_id: null,
};
