import { LabelValueDropdown } from '@uhub/types/common';
import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const LAB_SAMPLE_LIST = `${DIT_CONNECT}/lab-sample/list`;
export const LAB_SAMPLE_ADD = `${DIT_CONNECT}/lab-sample/add`;
export const LAB_SAMPLE_EDIT = `${DIT_CONNECT}/lab-sample/edit/:id`;
export const LAB_SAMPLE_VIEW = `${DIT_CONNECT}/lab-sample/view/:id`;

/** /////// End PATHS //////// */
export const LAB_SAMPLE = '/v2/lab-samples';
export const LAB_SAMPLE_PHOTO = '/v2/lab-sample-photos';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_LAB_SAMPLE: string = 'access_lab_sample';
export const CREATE_LAB_SAMPLE: string = 'create_lab_sample';
export const UPDATE_LAB_SAMPLE: string = 'update_lab_sample';
export const READ_LAB_SAMPLE: string = 'read_lab_sample';
export const DELETE_LAB_SAMPLE: string = 'delete_lab_sample';
export const APPROVE_LAB_SAMPLE: string = 'approve_lab_sample';

/** ************************* */
/*    LAB SAMPLE STATUS           */
/** ************************* */

export const LAB_SAMPLE_STATUS_CREATED: string = 'Created';
export const LAB_SAMPLE_STATUS_APPROVED: string = 'Approved';

export const LAB_SAMPLE_STATUS_OPTIONS: LabelValueDropdown[] = [
  { label: LAB_SAMPLE_STATUS_CREATED, value: LAB_SAMPLE_STATUS_CREATED },
  { label: LAB_SAMPLE_STATUS_APPROVED, value: LAB_SAMPLE_STATUS_APPROVED },
];

/** ************************* */
/*    LAB SAMPLE TAKEN FROM            */
/** ************************* */

export const LAB_SAMPLE_TAKEN_FROM_OPTIONS: LabelValueDropdown[] = [
  { label: 'Supply Tank', value: 'Supply Tank' },
  { label: 'Water Trough', value: 'Water Trough' },
  { label: 'Dam', value: 'Dam' },
  { label: 'Bore Water', value: 'Bore Water' },
  { label: 'Nutrient Tank', value: 'Nutrient Tank' },
  { label: 'Other', value: 'Other' },
];

/** ************************* */
/*    LAB SAMPLE TYPES           */
/** ************************* */

export const LAB_SAMPLE_TYPE_PASTURE: string = 'Pasture';
export const LAB_SAMPLE_TYPE_DUNG: string = 'Dung';
export const LAB_SAMPLE_TYPE_WATER: string = 'Water';
