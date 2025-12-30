export type DeviceConfiguration = {
  id: number;
  name: string;
  type: string;
  tags: string[] | null;
  variants: string[] | null | [];
};
