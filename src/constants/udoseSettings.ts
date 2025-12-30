import { LabelValue } from '../types/common';

export const DOSING_MODE_VOLUME: number = 0;
export const DOSING_MODE_TIMED: number = 1;
export const DOSING_MODE_HYBRID: number = 2;

export const CONDUCTIVITY_PROBE_MODE_DISABLED: number = 0;
export const CONDUCTIVITY_PROBE_MODE_ENABLED: number = 1;
export const CONDUCTIVITY_PROBE_MODE_NOT_INSTALLED: number = 2;
export const CONDUCTIVITY_PROBE_MODE_REPORTING: number = 3;

export const WATER_METER_MODE_1_LP: number = 0;
export const WATER_METER_MODE_10_LP: number = 1;
export const WATER_METER_MODE_100_LP: number = 2;
export const WATER_METER_MODE_25_MM_PL: number = 3;
export const WATER_METER_MODE_32_MM_PL: number = 4;
export const WATER_METER_MODE_50_MM_PL: number = 5;

export const NUTRIENT_METER_MODE_0_PL: number = 0;
export const NUTRIENT_METER_MODE_1000_PL: number = 1;
export const NUTRIENT_METER_MODE_OTHER: number = 2;
export const NUTRIENT_METER_MODE_1800_TO_2200_PL: number = 3;

export const NUTRIENT_PROBE_MODE_DECREMENT: number = 0;
export const NUTRIENT_PROBE_MODE_PRESSURE: number = 1;

export const TELEMETRY_MODE_DISABLED: number = 0;
export const TELEMETRY_MODE_ENABLED: number = 1;

export const TELEMETRY_DEMAND_MESSAGE_PACKET_SETTING_UPDATE: number = 20;
export const TELEMETRY_DEMAND_MESSAGE_PACKET_4_HOUR_UPDATE: number = 4;
export const TELEMETRY_DEMAND_MESSAGE_PACKET_24_HOUR_UPDATE: number = 24;

export const DOSING_MODE_OPTIONS: LabelValue[] = [
  { value: DOSING_MODE_VOLUME, label: 'Volume Dosing' },
  { value: DOSING_MODE_TIMED, label: 'Timed Dosing' },
  { value: DOSING_MODE_HYBRID, label: 'Hybrid Dosing' },
];

export const CONDUCTIVITY_PROBE_OPTIONS: LabelValue[] = [
  { value: CONDUCTIVITY_PROBE_MODE_DISABLED, label: 'Disabled' },
  { value: CONDUCTIVITY_PROBE_MODE_ENABLED, label: 'Enabled' },
  { value: CONDUCTIVITY_PROBE_MODE_NOT_INSTALLED, label: 'Not Installed' },
  { value: CONDUCTIVITY_PROBE_MODE_REPORTING, label: 'Reporting' },
];

export const WATER_METER_OPTIONS: LabelValue[] = [
  { value: WATER_METER_MODE_1_LP, label: '1 L/pulse' },
  { value: WATER_METER_MODE_10_LP, label: '10 L/pulse' },
  { value: WATER_METER_MODE_100_LP, label: '100 L/pulse' },
  { value: WATER_METER_MODE_25_MM_PL, label: '25mm pulse/L' },
  { value: WATER_METER_MODE_32_MM_PL, label: '32mm pulse/L' },
  { value: WATER_METER_MODE_50_MM_PL, label: '50mm pulse/L' },
];

export const NUTRIENT_METER_OPTIONS: LabelValue[] = [
  { value: NUTRIENT_METER_MODE_0_PL, label: '0 Pulse/L' },
  { value: NUTRIENT_METER_MODE_1000_PL, label: '1000 Pulse/L' },
  { value: NUTRIENT_METER_MODE_OTHER, label: 'Other (Unexpected)' },
  {
    value: NUTRIENT_METER_MODE_1800_TO_2200_PL,
    label: '1800-2200 Pulse/L',
  },
];

export const NUTRIENT_PROBE_OPTIONS: LabelValue[] = [
  { value: NUTRIENT_PROBE_MODE_DECREMENT, label: 'Nutrient Decrement' },
  { value: NUTRIENT_PROBE_MODE_PRESSURE, label: 'Pressure Mode' },
];

export const TELEMETRY_MODE_OPTIONS: LabelValue[] = [
  { value: TELEMETRY_MODE_DISABLED, label: 'Disabled' },
  { value: TELEMETRY_MODE_ENABLED, label: 'Enabled' },
];

export const TELEMETRY_DEMAND_MESSAGE_PACKET_OPTIONS: LabelValue[] = [
  {
    value: TELEMETRY_DEMAND_MESSAGE_PACKET_SETTING_UPDATE,
    label: 'Settings Update',
  },
  {
    value: TELEMETRY_DEMAND_MESSAGE_PACKET_4_HOUR_UPDATE,
    label: 'Four Hour Update',
  },
  {
    value: TELEMETRY_DEMAND_MESSAGE_PACKET_24_HOUR_UPDATE,
    label: '24 Hour Update',
  },
];

type Options = Record<string, LabelValue[]>;

const OPTIONS: Options[] = [
  {
    dosingModeOptions: DOSING_MODE_OPTIONS,
  },
  {
    conductivityProbeOptions: CONDUCTIVITY_PROBE_OPTIONS,
  },
  {
    waterMeterOptions: WATER_METER_OPTIONS,
  },
  {
    nutrientMeterOptions: NUTRIENT_METER_OPTIONS,
  },
  {
    nutrientProbeOptions: NUTRIENT_PROBE_OPTIONS,
  },
  {
    telemetryModeOptions: TELEMETRY_MODE_OPTIONS,
  },
  {
    telemetryDemandMessagePacket: TELEMETRY_DEMAND_MESSAGE_PACKET_OPTIONS,
  },
];

export const NUTRIENT_PROBE_MODE = {
  [NUTRIENT_PROBE_MODE_DECREMENT]: 'Nutrient Decrement',
  [NUTRIENT_PROBE_MODE_PRESSURE]: 'Pressure Mode',
};

export const DOSING_MODE = {
  [DOSING_MODE_VOLUME]: 'Volume Dosing',
  [DOSING_MODE_TIMED]: 'Timed Dosing',
  [DOSING_MODE_HYBRID]: 'Hybrid Dosing',
};

export const CONDUCTIVITY_PROBE_MODE: Record<number, string> = {
  [CONDUCTIVITY_PROBE_MODE_DISABLED]: 'Disabled',
  [CONDUCTIVITY_PROBE_MODE_ENABLED]: 'Enabled',
  [CONDUCTIVITY_PROBE_MODE_NOT_INSTALLED]: 'Not Installed',
  [CONDUCTIVITY_PROBE_MODE_REPORTING]: 'Reporting',
};

export const WATER_METER_MODE = {
  [WATER_METER_MODE_1_LP]: '1 L/pulse',
  [WATER_METER_MODE_10_LP]: '10 L/pulse',
  [WATER_METER_MODE_100_LP]: '100 L/pulse',
  [WATER_METER_MODE_25_MM_PL]: '25mm pulse/L',
  [WATER_METER_MODE_32_MM_PL]: '32mm pulse/L',
  [WATER_METER_MODE_50_MM_PL]: '50mm pulse/L',
};

export const NUTRIENT_METER_MODE = {
  [NUTRIENT_METER_MODE_0_PL]: '0 Pulse/L',
  [NUTRIENT_METER_MODE_1000_PL]: '1000 Pulse/L',
  [NUTRIENT_METER_MODE_OTHER]: 'Other (Unexpected)',
  [NUTRIENT_METER_MODE_1800_TO_2200_PL]: '1800-2200 Pulse/L',
};

export const TELEMETRY_MODE = {
  [TELEMETRY_MODE_DISABLED]: 'Disabled',
  [TELEMETRY_MODE_ENABLED]: 'Enabled',
};

export default OPTIONS;

export const SUPPLEMENT_DRY_QUANTITY_OPTIONS = [
  { value: 600, label: '600 Kg' },
  { value: 500, label: '500 Kg' },
];

// Nutrient settings keys

export const SETTINGS_KEY_NUTRIENT_CONCENTRATION = 'nutrient_concentration';

export const SETTINGS_KEY_TANK_CAPACITY = 'nutrient_tank_capacity';

export const SETTINGS_KEY_NUTRIENT_TANK_HEIGHT = 'nutrient_tank_height';

export const SETTINGS_KEY_NUTRIENT_PROBE_MODE = 'nutrient_probe_mode';

export const SETTINGS_KEY_NUTRIENT_TANK_CURRENT_LEVEL =
  'nutrient_tank_current_level';

export const SETTINGS_KEY_WATER_FLOW_LIMIT_PER_HR = 'water_flow_limit_per_hr';
