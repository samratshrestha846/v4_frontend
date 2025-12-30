import { GeneralResponse } from '../generalResponse';

type Maintainer = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  profile_picture: string | null;
};

type ServiceLog = {
  arrival_time: string;
  date: string;
  departure_time: string;
  follow_up_id: number;
  id: number;
  maintainer: Maintainer;
  notes: string;
  site_id: number;
  status: string;
  user_id: number;
};

interface ServiceLogResponse extends GeneralResponse<ServiceLog[]> {
  body: ServiceLog[];
}

type ServiceLogFormValues = {
  site_id: number;
  follow_up_id?: number;
  date: string | Date;
  arrival_time: string | Date;
  departure_time: string | Date;
  notes: string;
  user_id: number;
};

export type { ServiceLogResponse, ServiceLog, ServiceLogFormValues };
