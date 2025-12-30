import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  LAB_SAMPLE_LIST,
  LAB_SAMPLE_ADD,
  LAB_SAMPLE_EDIT,
  ACCESS_LAB_SAMPLE,
  CREATE_LAB_SAMPLE,
  UPDATE_LAB_SAMPLE,
  LAB_SAMPLE_VIEW,
  READ_LAB_SAMPLE,
} from '../constants/constant';

const ListLabSample = React.lazy(() => import('../pages/ListLabSample'));
const AddLabSample = React.lazy(() => import('../pages/AddLabSample'));
const EditLabSample = React.lazy(() => import('../pages/EditLabSample'));
const ViewLabSample = React.lazy(() => import('../pages/ViewLabSample'));

const LAB_SAMPLE_ROUTE = [
  {
    path: LAB_SAMPLE_LIST,
    element: (
      <RouteWithPermission
        component={ListLabSample}
        permission={ACCESS_LAB_SAMPLE}
      />
    ),
  },
  {
    path: LAB_SAMPLE_ADD,
    element: (
      <RouteWithPermission
        component={AddLabSample}
        permission={CREATE_LAB_SAMPLE}
      />
    ),
  },
  {
    path: LAB_SAMPLE_VIEW,
    element: (
      <RouteWithPermission
        component={ViewLabSample}
        permission={READ_LAB_SAMPLE}
      />
    ),
  },
  {
    path: LAB_SAMPLE_EDIT,
    element: (
      <RouteWithPermission
        component={EditLabSample}
        permission={UPDATE_LAB_SAMPLE}
      />
    ),
  },
];
export default LAB_SAMPLE_ROUTE;
