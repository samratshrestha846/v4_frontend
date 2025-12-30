import { GeneralResponse } from '@uhub/types/generalResponse';

export type SupplementResponse = {
  id: number;
  group: string;
  name: string;
  slug: string;
  status: string;
  tags: string[];
  type: string;
};

export type SupplementFormProps = {
  name: string | null;
  slug: string | null;
  group: string | null;
  type: string | null;
  tags: string[];
  status: string | null;
};

export interface SupplementListResponse
  extends GeneralResponse<SupplementResponse[]> {
  data: SupplementResponse[];
}

export type QueryParamSupplement = {
  page: number;
  search?: string;
  tags?: string;
};

export type SupplementParams = QueryParamSupplement & {};

export const supplementType = {
  DRY: 'Dry',
  LIQUID: 'Liquid',
} as const;

export const supplementTypeOptions = Object.entries(supplementType).map(
  ([, value]) => ({
    label: value,
    value,
  })
);

export const supplementTags = {
  FSM_DELIVERY: 'FSM Delivery',
  MIXING: 'Mixing',
} as const;

export const supplementTagsOptions = Object.entries(supplementTags).map(
  ([, value]) => ({
    label: value,
    value,
  })
);
