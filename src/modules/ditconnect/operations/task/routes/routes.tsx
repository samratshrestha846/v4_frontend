import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  TASK_LIST,
  TASK_ADD,
  TASK_EDIT,
  TASK_VIEW,
  ACCESS_TASK,
  CREATE_TASK,
  UPDATE_TASK,
  READ_TASK,
} from '../constants/constant';

const ListTask = React.lazy(() => import('../pages/ListTask'));
const AddTask = React.lazy(() => import('../pages/AddTask'));
const EditTask = React.lazy(() => import('../pages/EditTask'));
const ViewTask = React.lazy(() => import('../pages/ViewTask'));

const TASK_ROUTE = [
  {
    path: TASK_LIST,
    element: (
      <RouteWithPermission component={ListTask} permission={ACCESS_TASK} />
    ),
  },
  {
    path: TASK_ADD,
    element: (
      <RouteWithPermission component={AddTask} permission={CREATE_TASK} />
    ),
  },
  {
    path: TASK_EDIT,
    element: (
      <RouteWithPermission component={EditTask} permission={UPDATE_TASK} />
    ),
  },
  {
    path: TASK_VIEW,
    element: (
      <RouteWithPermission component={ViewTask} permission={READ_TASK} />
    ),
  },
];
export default TASK_ROUTE;
