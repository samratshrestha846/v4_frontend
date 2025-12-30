/* eslint-disable no-unused-vars */
import {
  UCalmNutrition,
  UCalmWeanerNutrition,
  UProBlueAgolinNutrition,
  UProForageNutrition,
  UProGreenNutrition,
  UProMulgaNutrition,
  UProOrangeHighPhosNutrition,
  UProOrangeNutrition,
  UProSouthernNutrition,
  UTraceNutrition,
} from '../supplements/supplement';
import { SiteSetting } from './udoseList';
import UdoseRecordSettings from './udoseSettings';

type SupplementFeedAnalysisFilterParams = {
  site_id: string | undefined;
  breakdown_as: string;
  breakdown_number?: number;
  duration?: string;
};

type SupplementFeedAnalysisSite = {
  id: number;
  name: string;
  site_number: number;
  alarm_message: string | null;
  site_settings: SiteSetting[];
};

type BreakdownData =
  | UProGreenNutrition
  | UTraceNutrition
  | UCalmWeanerNutrition
  | UCalmNutrition
  | UProForageNutrition
  | UProSouthernNutrition
  | UProMulgaNutrition
  | UProBlueAgolinNutrition
  | UProOrangeNutrition
  | UProOrangeHighPhosNutrition;

type SupplementBreakdown = {
  supplement_name: string;
  breakdowns: BreakdownData;
};

type AveragePerHeadData = {
  nutrient_in_ml: number;
  water_intake_in_l: number;
  supplement_breakdowns: SupplementBreakdown[];
};

type SupplementFeedAnalysisUdoseRecordSetting = {
  id: number;
  target_dose: number;
  trigger_point: number;
  supplement_name: string | null;
};

type SupplementFeedAnalysisRecord = {
  id: number;
  message_date: string;
  nutrient_flow: number;
  nutrient_in_ml: number;
  water_flow: number;
  water_intake_in_l: number;
  nutrient_breakdown: BreakdownData;
  udose_record_setting: UdoseRecordSettings;
};

type SumPerHeadData = {
  nutrient_in_ml: number;
  water_intake_in_l: number;
  supplement_breakdowns: SupplementBreakdown[];
};

type SumTotalData = {
  nutrient_flow: number;
  water_flow: number;
  total_records: number;
  records: SupplementFeedAnalysisRecord[];
};

type SupplementFeedAnalysisFilterData = {
  site_id: number;
  breakdown_as: string;
  breakdown_number: string;
  duration: string;
};

type RecordData = {
  breakdowns: SupplementFeedAnalysisRecord[];
  supplement_name: string;
};

type SupplementFeedAnalysis = {
  site: SupplementFeedAnalysisSite;
  filters: SupplementFeedAnalysisFilterData;
  avg_per_head: AveragePerHeadData;
  sum_per_head: SumPerHeadData;
  sum_total: SumTotalData;
  records: RecordData[];
};

type TabularColumn = {
  dataField: string;
  text: string;
  sort?: boolean;
  formatter?: (row: SupplementFeedAnalysisRecord) => string;
};

export type {
  SupplementFeedAnalysisFilterParams,
  SupplementFeedAnalysisFilterData,
  SupplementFeedAnalysis,
  SupplementFeedAnalysisRecord,
  TabularColumn,
  SumTotalData,
  SumPerHeadData,
  AveragePerHeadData,
  BreakdownData,
};
