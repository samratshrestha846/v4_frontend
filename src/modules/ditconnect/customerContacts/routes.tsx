import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  CUSTOMER_CONTACT_LIST,
  ACCESS_CUSTOMER_CONTACT,
  CUSTOMER_CONTACT_ADD,
  CREATE_CUSTOMER_CONTACT,
  CUSTOMER_CONTACT_EDIT,
  UPDATE_CUSTOMER_CONTACT,
} from './constants/constant';

const ListCustomerContacts = React.lazy(() => import('./ListCustomerContacts'));
const AddCustomerContact = React.lazy(() => import('./AddCustomerContact'));
const EditCustomerContact = React.lazy(() => import('./EditCustomerContact'));

const CUSTOMER_CONTACT_ROUTE = [
  {
    path: CUSTOMER_CONTACT_LIST,
    element: (
      <RouteWithPermission
        component={ListCustomerContacts}
        permission={ACCESS_CUSTOMER_CONTACT}
      />
    ),
  },
  {
    path: CUSTOMER_CONTACT_ADD,
    element: (
      <RouteWithPermission
        component={AddCustomerContact}
        permission={CREATE_CUSTOMER_CONTACT}
      />
    ),
  },
  {
    path: CUSTOMER_CONTACT_EDIT,
    element: (
      <RouteWithPermission
        component={EditCustomerContact}
        permission={UPDATE_CUSTOMER_CONTACT}
      />
    ),
  },
];

export default CUSTOMER_CONTACT_ROUTE;
