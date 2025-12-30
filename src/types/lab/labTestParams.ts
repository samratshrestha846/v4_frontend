import { GeneralResponse } from '../generalResponse';

type SubParam = {
  key: string;
  unit: string;
  name: string;
  result?: string;
  range?: string;
  is_default?: boolean;
};

type Param = {
  key: string;
  unit: string;
  name: string;
  result?: string;
  sub_params?: SubParam[];
  range?: string;
  is_default?: boolean;
};

type LabTestParams = {
  id: number;
  lab_sample_type_id: number;
  test_type: string;
  params: Param[];
};

interface LabTestParamsResponse extends GeneralResponse<LabTestParams[]> {
  data: LabTestParams[];
}

type LabTestParamsQuery = {
  page: number;
  search?: string;
  customer_id?: number;
  property_id?: number;
  site_id?: number;
  sample_type_id?: number;
};

export type {
  LabTestParamsResponse,
  LabTestParamsQuery,
  LabTestParams,
  Param,
  SubParam,
};
