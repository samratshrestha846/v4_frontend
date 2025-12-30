import { LabelValue } from '@uhub/types/common';
import { DIT_CONNECT } from '../../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const WORK_DIARY_LIST = `${DIT_CONNECT}/work-diary/list`;
export const WORK_DIARY_ADD = `${DIT_CONNECT}/work-diary/add`;
export const WORK_DIARY_EDIT = `${DIT_CONNECT}/work-diary/edit/:id`;
export const WORK_DIARY_VIEW = `${DIT_CONNECT}/work-diary/view/:id`;

/** /////// End PATHS //////// */
export const WORK_DIARY = '/v2/work-diaries';
export const RND_ACTIVITIES = '/v2/dropdown/activities';
export const WORK_DIARY_EXPORT_ENDPOINT = '/v2/export/work-diaries';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_WORK_DIARY: string = 'access_rnd';
export const CREATE_WORK_DIARY: string = 'create_rnd';
export const UPDATE_WORK_DIARY: string = 'update_rnd';
export const READ_WORK_DIARY: string = 'read_rnd';
export const DELETE_WORK_DIARY: string = 'delete_rnd';
export const EXPORT_WORK_DIARY: string = 'export_rnd';

/** ************************* */
/*    WORK DIARY GROUPS           */
/** ************************* */

export const WORK_DIARY_GROUP_DIT = 'DIT';
export const WORK_DIARY_GROUP_CLEVER_COW = 'Clever Cow';
export const WORK_DIARY_GROUP_NEVILLE = 'Neville';

export const WORK_DIARY_GROUP_OPTIONS: LabelValue[] = [
  { label: WORK_DIARY_GROUP_DIT, value: WORK_DIARY_GROUP_DIT },
  { label: WORK_DIARY_GROUP_CLEVER_COW, value: WORK_DIARY_GROUP_CLEVER_COW },
  { label: WORK_DIARY_GROUP_NEVILLE, value: WORK_DIARY_GROUP_NEVILLE },
];
