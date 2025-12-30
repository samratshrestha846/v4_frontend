import { Customer } from '../customer/customerList';
import { GeneralResponse } from '../generalResponse';
import { Property } from '../property/propertyList';
import Region from '../region/regionList';

type Paddock = {
  id: number;
  name: string;
  area_in_hectare: number;
  blocks_count: number;
  customer_id: number;
  customer_property_id: number;
  customer: Customer;
  customer_property: Property;
  region: Region;
};

interface PaddockListResponse extends GeneralResponse<Paddock[]> {
  body: Paddock[];
}

type PaddockQueryParams = {
  page?: number;
  search?: string;
  status?: string;
  customer_id?: number;
  customer_property_id?: number;
};

type PaddockFormValues = {
  name: string;
  customer_property_id: number;
  area_in_hectare: number;
};

export type {
  Paddock,
  PaddockListResponse,
  PaddockQueryParams,
  PaddockFormValues,
};
