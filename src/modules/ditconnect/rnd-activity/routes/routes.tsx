import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  RND_ACTIVITY_LIST,
  RND_ACTIVITY_ADD,
  RND_ACTIVITY_EDIT,
  ACCESS_RND_ACTIVITY,
  CREATE_RND_ACTIVITY,
  UPDATE_RND_ACTIVITY,
} from '../constants/constant';

const ListRndActivity = React.lazy(() => import('../pages/ListRndActivity'));
const AddRndActivity = React.lazy(() => import('../pages/AddRndActivity'));
const EditRndActivity = React.lazy(() => import('../pages/EditRndActivity'));

const RND_ACTIVITY_ROUTE = [
  {
    path: RND_ACTIVITY_LIST,
    element: (
      <RouteWithPermission
        component={ListRndActivity}
        permission={ACCESS_RND_ACTIVITY}
      />
    ),
  },
  {
    path: RND_ACTIVITY_ADD,
    element: (
      <RouteWithPermission
        component={AddRndActivity}
        permission={CREATE_RND_ACTIVITY}
      />
    ),
  },
  {
    path: RND_ACTIVITY_EDIT,
    element: (
      <RouteWithPermission
        component={EditRndActivity}
        permission={UPDATE_RND_ACTIVITY}
      />
    ),
  },
];
export default RND_ACTIVITY_ROUTE;
