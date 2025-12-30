import { LabelValueDropdown } from '@uhub/types/common';
import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const RND_ACTIVITY_LIST = `${DIT_CONNECT}/rnd-activity/list`;
export const RND_ACTIVITY_ADD = `${DIT_CONNECT}/rnd-activity/add`;
export const RND_ACTIVITY_EDIT = `${DIT_CONNECT}/rnd-activity/edit/:id`;

/** /////// End PATHS //////// */
export const RND_ACTIVITY = '/v2/activities';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const READ_RND_ACTIVITY: string = 'read_rnd_activity';
export const ACCESS_RND_ACTIVITY: string = 'access_rnd_activity';
export const CREATE_RND_ACTIVITY: string = 'create_rnd_activity';
export const UPDATE_RND_ACTIVITY: string = 'update_rnd_activity';
export const DELETE_RND_ACTIVITY: string = 'delete_rnd_activity';

/** ************************* */
/*    RND ACTIVITY STATUS           */
/** ************************* */

export const RND_ACTIVITY_STATUS_ACTIVE: string = 'Active';
export const RND_ACTIVITY_STATUS_INACTIVE: string = 'In-Active';

export const RND_ACTIVITY_STATUS_OPTIONS: LabelValueDropdown[] = [
  { label: RND_ACTIVITY_STATUS_ACTIVE, value: RND_ACTIVITY_STATUS_ACTIVE },
  { label: RND_ACTIVITY_STATUS_INACTIVE, value: RND_ACTIVITY_STATUS_INACTIVE },
];
