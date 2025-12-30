import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  TEMPLATE_LIST,
  TEMPLATE_ADD,
  TEMPLATE_EDIT,
  ACCESS_TEMPLATE,
  CREATE_TEMPLATE,
  UPDATE_TEMPLATE,
  TEMPLATE_VIEW,
  READ_TEMPLATE,
} from '../constants/constant';

const ListTemplate = React.lazy(() => import('../pages/ListTemplate'));
const AddTemplate = React.lazy(() => import('../pages/AddTemplate'));
const EditTemplate = React.lazy(() => import('../pages/EditTemplate'));
const ViewTemplate = React.lazy(() => import('../pages/ViewTemplate'));

const TEMPLATE_ROUTE = [
  {
    path: TEMPLATE_LIST,
    element: (
      <RouteWithPermission
        component={ListTemplate}
        permission={ACCESS_TEMPLATE}
      />
    ),
  },
  {
    path: TEMPLATE_ADD,
    element: (
      <RouteWithPermission
        component={AddTemplate}
        permission={CREATE_TEMPLATE}
      />
    ),
  },
  {
    path: TEMPLATE_EDIT,
    element: (
      <RouteWithPermission
        component={EditTemplate}
        permission={UPDATE_TEMPLATE}
      />
    ),
  },
  {
    path: TEMPLATE_VIEW,
    element: (
      <RouteWithPermission
        component={ViewTemplate}
        permission={READ_TEMPLATE}
      />
    ),
  },
];
export default TEMPLATE_ROUTE;
