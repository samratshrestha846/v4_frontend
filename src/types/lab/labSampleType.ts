type LabSampleType = {
  id: number;
  name: string;
  test_types?: TestType[];
};

type TestType = {
  name: string;
  key: string;
};

export type { LabSampleType };
