type RainfallRecord = {
  id: number;
  rainfall: number;
  message_date: string;
};

type Rainfall = {
  yesterday: number;
  week: number;
  records: RainfallRecord[];
};

type RainfallFilterParams = {
  date_from: string | null;
  date_to: string | null;
};

export type { RainfallRecord, Rainfall, RainfallFilterParams };
