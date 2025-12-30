import { GeneralResponse } from '../generalResponse';
import { LabSample } from './labSampleList';
import { LabTestParams, Param } from './labTestParams';

type LabTestResult = {
  id: number;
  lab_sample_id?: number;
  lab_test_param_id?: number;
  analysed_by: any;
  analysed_date_time: string;
  lab_sample: LabSample;
  lab_test_param: LabTestParams;
  results: Param[];
  comments: string | null;
  is_published: boolean;
  published_by: any;
};

type LabTestResultView = {
  lab_sample_id: number;
  sampleId: string | undefined;
  lab_sample_type: string;
  grass_species?: string;
  animal_specs?: string;
  results: Param[];
  paddock?: string;
};

interface LabTestResultResponse extends GeneralResponse<LabTestResult[]> {
  data: LabTestResult[];
}

export type { LabTestResultResponse, LabTestResult, LabTestResultView };
