/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';
import { DitUser } from '@uhub/types/user/user';

export type SupplementTaskDescription = {
  supplement: { id: number | null; name: string | null } | null;
  from_location: { id: number | null; name: string | null } | null;
  to_location: { id: number | null; name: string | null } | null;
  batch_no: number | null;
  qty: number | null;
};
export type UdoseInstallationTaskDescription = {
  customer_property: { id: number | null; name: string | null } | null;
  device: { id: number | null; name: string | null } | null;
  site_name: string | null;
  rainfall_setting: string | null;
};

export type TaskParams = QueryParam & {
  created_by: number | null;
  assigned_to: number | null;
  status: string | null;
};

enum TASK_STATUS {
  TODO = 'To-Do',
  IN_PROGRESS = 'In-Progress',
  ON_HOLD = 'On-Hold',
  COMPLETED = 'Completed',
}
export enum TASK_TYPE {
  SUPPLEMENT_TRANSFER = 'Supplement Transfer',
  UDOSE_INSTALLATION = 'Udose Installation',
}
export enum RAINFALL_SETTING_STATUS {
  ENABLED = 'Enabled',
  DISABLED = 'Disabled',
}

export const taskStatusOptions = Object.entries(TASK_STATUS).map(
  ([, value]) => ({
    label: value,
    value,
  })
);

export const taskTypeOptions = Object.entries(TASK_TYPE).map(([, value]) => ({
  label: value,
  value,
}));

export const rainfallSettingStatus = Object.entries(
  RAINFALL_SETTING_STATUS
).map(([, value]) => ({
  label: value,
  value,
}));

export type SupplementBatch = {
  batch_number: string;
};
export type TaskFormProps = {
  date: string | Date | null;
  type: string | null;
  assigned_to: number | null;
  notes: string | null;
  descriptions: SupplementTaskDescription[];
};
export const DEFAULT_SUPPLEMENT_TRANSFER: SupplementTaskDescription = {
  supplement: {
    id: null,
    name: null,
  },
  from_location: {
    id: null,
    name: null,
  },
  to_location: { id: null, name: null },
  batch_no: null,
  qty: null,
};
export const DEFAULT_UDOSE_INSTALLATION: UdoseInstallationTaskDescription = {
  customer_property: {
    id: null,
    name: null,
  },
  site_name: null,
  device: {
    id: null,
    name: null,
  },
  rainfall_setting: null,
};
export interface TaskWithStatus {
  id: number;
  task_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  description: string;
}

export type TaskResponse = {
  id: number;
  task_id: string;
  type: string;
  date: string | Date;
  assigned_to: DitUser | null;
  status: string;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: DitUser;
  task_descriptions: TaskWithStatus[];
};

export interface TaskListResponse extends GeneralResponse<TaskResponse[]> {
  data: TaskResponse[];
}

export const taskStatusColorOptions = [
  {
    key: TASK_STATUS.TODO,
    value: 'bg-yellow-200 text-yellow-900',
  },
  {
    key: TASK_STATUS.IN_PROGRESS,
    value: 'bg-blue-200 text-blue-900',
  },
  {
    key: TASK_STATUS.ON_HOLD,
    value: 'bg-gray-200 text-gray-900',
  },
  {
    key: TASK_STATUS.COMPLETED,
    value: 'bg-green-200 text-green-900',
  },
];
