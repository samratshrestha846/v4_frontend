import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  MESSAGE_LIST,
  ACCESS_MESSAGE,
  MESSAGE_ADD,
  MESSAGE_EDIT,
  CREATE_MESSAGE,
  UPDATE_MESSAGE,
} from '../constants/constant';

const ListMessage = React.lazy(() => import('../pages/ListMessage'));
const AddMessage = React.lazy(() => import('../pages/AddMessage'));
const EditMessage = React.lazy(() => import('../pages/EditMessage'));

const MESSAGE_ROUTE = [
  {
    path: MESSAGE_LIST,
    element: (
      <RouteWithPermission
        component={ListMessage}
        permission={ACCESS_MESSAGE}
      />
    ),
  },
  {
    path: MESSAGE_ADD,
    element: (
      <RouteWithPermission component={AddMessage} permission={CREATE_MESSAGE} />
    ),
  },
  {
    path: MESSAGE_EDIT,
    element: (
      <RouteWithPermission
        component={EditMessage}
        permission={UPDATE_MESSAGE}
      />
    ),
  },
];
export default MESSAGE_ROUTE;
