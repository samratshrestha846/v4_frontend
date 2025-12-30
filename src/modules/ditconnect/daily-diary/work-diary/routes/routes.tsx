import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  ACCESS_WORK_DIARY,
  READ_WORK_DIARY,
  UPDATE_WORK_DIARY,
  WORK_DIARY_ADD,
  WORK_DIARY_EDIT,
  WORK_DIARY_LIST,
  WORK_DIARY_VIEW,
} from '../constants/constant';

const ListDailyDiary = React.lazy(() => import('../../pages/ListDailyDiary'));
const ViewWorkDiary = React.lazy(() => import('../pages/ViewWorkDiary'));
const AddWorkDiary = React.lazy(() => import('../pages/AddWorkDiary'));
const EditWorkDiary = React.lazy(() => import('../pages/EditWorkDiary'));

const WORK_DIARY_ROUTE = [
  {
    path: WORK_DIARY_LIST,
    element: (
      <RouteWithPermission
        component={ListDailyDiary}
        permission={[ACCESS_WORK_DIARY]}
      />
    ),
  },
  {
    path: WORK_DIARY_VIEW,
    element: (
      <RouteWithPermission
        component={ViewWorkDiary}
        permission={READ_WORK_DIARY}
      />
    ),
  },
  {
    path: WORK_DIARY_ADD,
    element: (
      <RouteWithPermission
        component={AddWorkDiary}
        permission={READ_WORK_DIARY}
      />
    ),
  },
  {
    path: WORK_DIARY_EDIT,
    element: (
      <RouteWithPermission
        component={EditWorkDiary}
        permission={UPDATE_WORK_DIARY}
      />
    ),
  },
];
export default WORK_DIARY_ROUTE;
