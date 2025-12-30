/* eslint-disable no-unused-vars */
import { LabelValue } from '@uhub/types/common';
import { GroupedOption } from './ditConnect';

// Field configuration for dynamic form
export type FieldConfig = {
  name: string;
  type: string;
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  options?: LabelValue[] | ((index: number) => LabelValue[]);
  groupedOptions?: GroupedOption<any>[];
  step?: string;
  readOnly?: boolean;
  label?: string;
  isHidden?: boolean | ((index: number) => boolean);
};

export type DynamicFormConfig = {
  fields: FieldConfig[];
  defaultValues: any;
};
