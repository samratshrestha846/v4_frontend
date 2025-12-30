import React from 'react';
import RouteWithPermission from '@uhub/routes/RouteWithPermission';
import {
  ACCESS_FILE,
  ACCESS_FOLDER,
  CREATE_FILE,
  CREATE_FOLDER,
  FILE_ADD,
  FILE_EDIT,
  FOLDER_ADD,
  FOLDER_EDIT,
  FOLDER_LIST,
  FOLDER_VIEW,
  UPDATE_FILE,
  UPDATE_FOLDER,
} from '../constants/constant';

const ListFolder = React.lazy(() => import('../pages/Folder/ListFolder'));
const AddFolder = React.lazy(() => import('../pages/Folder/AddFolder'));
const EditFolder = React.lazy(() => import('../pages/Folder/EditFolder'));

const ListFile = React.lazy(() => import('../pages/Files/ListFiles'));
const EditFile = React.lazy(() => import('../pages/Files/EditFile'));
const AddFile = React.lazy(() => import('../pages/Files/AddFile'));

const DOCUMENT_ROUTE = [
  {
    path: FOLDER_LIST,
    element: (
      <RouteWithPermission component={ListFolder} permission={ACCESS_FOLDER} />
    ),
  },
  {
    path: FOLDER_ADD,
    element: (
      <RouteWithPermission component={AddFolder} permission={CREATE_FOLDER} />
    ),
  },
  {
    path: FOLDER_EDIT,
    element: (
      <RouteWithPermission component={EditFolder} permission={UPDATE_FOLDER} />
    ),
  },
  {
    // File List
    path: FOLDER_VIEW,
    element: (
      <RouteWithPermission component={ListFile} permission={ACCESS_FILE} />
    ),
  },
  {
    path: FILE_EDIT,
    element: (
      <RouteWithPermission component={EditFile} permission={UPDATE_FILE} />
    ),
  },
  {
    path: FILE_ADD,
    element: (
      <RouteWithPermission component={AddFile} permission={CREATE_FILE} />
    ),
  },
];
export default DOCUMENT_ROUTE;
