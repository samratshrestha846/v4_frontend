import { DEVICE, SITE, USER } from './constants';

export const MODEL_TYPE_OPTIONS = [
  { label: 'Site', value: SITE },
  { label: 'Device', value: DEVICE },
  { label: 'User', value: USER },
];

export const BASE_TYPE_OPTIONS = [
  { value: 'create', label: 'Create' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' },
  { value: 'note', label: 'Notes' },
];
