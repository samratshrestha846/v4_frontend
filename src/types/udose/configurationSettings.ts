export type ConfigurationSetting = {
  id: number;
  name: string;
  key: string;
  options: (string | number)[] | null | [];
};
