type IPermissions = {
  id: number;
  name: string;
};

type IRoles = {
  id: number;
  name: string;
  permissions: IPermissions[];
};
export type IUser = {
  id: number;
  name: string;
  email: string;
  status: string;
  roles: IRoles[];
  permissions: IPermissions[];
  mobile_number: string;
  department: string;
  position: string;
};

export type FilterConfigItem<T> = {
  filterType: string;
  key: keyof T;
  isMulti?: boolean;
  dataOptions?: any;
  isDateField?: boolean;
};
export type Customer = {
  customer_id: number;
  property_id: number;
  name: string;
  property_name: string;
  identifier: string;
  email: string;
  phone: string;
};

export interface GroupedOption<T> {
  label: string;
  options: Array<T>;
}
