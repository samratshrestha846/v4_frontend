import { GeneralResponseOld } from './generalResponse';

export type TransportEmissionQueryParams = {
  page: number;
  search?: string;
  sort?: string;
  direction?: string;
};

export type TransportEmission = {
  id: 3;
  origin: string;
  destination: string;
  distance: number;
  vehicle: string;
  emission_per_kg: number;
  created_at: string;
  updated_at: string;
};

export type TransportEmissionFormFields = {
  origin: string;
  destination: string;
  distance: number;
  vehicle: string;
  emission_per_kg: number;
};

export interface TransportEmissionResponse
  extends GeneralResponseOld<TransportEmission[]> {
  data: TransportEmission[];
}
