import { Dispatch, ReactElement, SetStateAction, SVGProps } from 'react';

type StatusUpdatedBy = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
  type?: string;
};

type PropertyDropdownOption = {
  name: string;
  id: number;
};

type SiteDropdownOptions = {
  name: string;
  id: number;
};

type LabelValue = {
  label: string | number;
  value: string | number;
};

type LabelValueDropdown = {
  label: string;
  value: string;
};

type LabelNumericValueDropdown = {
  label: string;
  value: number;
};

type LabelNumericValue = {
  label: string;
  value: number;
};

type DurationQueryFilterParams = {
  date_from: string;
  date_to: string;
};

type DurationQueryFilterStartEndParams = {
  start_date: string;
  end_date: string;
};

type ChartSeriesData = {
  name: string;
  data: number[];
};

type CustomDropdownMenuItem = {
  label: string;
  icon?: string;
  variant?: string;
  hasDivider?: boolean;
  url?: string;
  permission?: string;
  actionKey?: string;
  isDependedAction?: boolean;
  modalContent?: any;
  actionMethod?: () => void;
};

type CustomAccordionItem = {
  id: number;
  title: string;
  text: string;
};

export type {
  StatusUpdatedBy,
  Tag,
  PropertyDropdownOption,
  SiteDropdownOptions,
  LabelValue,
  LabelValueDropdown,
  LabelNumericValue,
  DurationQueryFilterParams,
  DurationQueryFilterStartEndParams,
  ChartSeriesData,
  LabelNumericValueDropdown,
  CustomDropdownMenuItem,
  CustomAccordionItem,
};

export type TableColumn = {
  dataField: string;
  text: string | ReactElement;
  sortable?: boolean;
  format?: boolean;
  formatter?: Function;
};

export type MenuItem = {
  key: string;
  label: string;
  isTitle?: boolean;
  children?: MenuItem[];
  icon?: string;
  url?: string;
  parentKey?: string;
  permission: string | string[] | null;
  badge?: {
    variant: string;
    text?: string;
  };
  target?: string;
  customIcon?: ReactElement;
};

export type TabOption = {
  eventKey: string;
  title: any;
  tabClassName?: string;
  tabContent: any;
  iconClassName?: string;
};

export type CustomDateRange = {
  from_date: Date | undefined;
  to_date: Date | undefined;
};

export type PaginationPerPageOptions = {
  label: number;
  value: number;
};

export type DropdownFilterItem = {
  filterType: string;
  setFilterData: Dispatch<SetStateAction<any>>;
  dataOptions: LabelNumericValue[] | LabelValue[] | LabelValueDropdown[];
  isMulti?: boolean;
  data: any;
  isDateField?: boolean;
};

export type QueryParam = {
  page: number;
  search?: string;
};

export type UserQueryParam = QueryParam & {
  user_id?: number | null;
};

export type ListTableProps<T> = {
  isFetching: boolean;
  isError?: boolean;
  data?: T;
  refetch?: any;
  filters: any;
  setFilters: any;
};
export interface CustomSVGIconProps extends SVGProps<SVGSVGElement> {}
