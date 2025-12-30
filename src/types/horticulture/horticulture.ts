import { GeneralResponse } from '../generalResponse';

type CropFormValues = {
  life_span_in_days: number;
  name: string;
};

type Crop = {
  id: number;
  life_span_in_days: number;
  name: string;
};

type ListCropsParams = {
  page?: number;
};

interface CropsResponse extends GeneralResponse<Crop[]> {
  body: Crop[];
}

type ListCropLifeCycleParams = {
  page?: number;
  crop_id?: number;
};

type CropLifeCycle = {
  crop_id: number;
  id: number;
  crop_stage_name: string;
  started_in_days: number;
  ended_in_days: number;
};

interface CropLifeCycleResponse extends GeneralResponse<CropLifeCycle[]> {
  body: CropLifeCycle[];
}

type CropCycleFormValues = {
  crop_id: number;
  crop_stage_name: string;
  started_in_days: number;
  ended_in_days: number;
};

export type {
  CropsResponse,
  Crop,
  ListCropsParams,
  CropFormValues,
  CropLifeCycleResponse,
  CropLifeCycle,
  ListCropLifeCycleParams,
  CropCycleFormValues,
};
