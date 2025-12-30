const OPTIONS = [
  {
    dosingModeOptions: [
      { value: 0, label: 'Volume Dosing' },
      { value: 1, label: 'Timed Dosing' },
    ],
  },
  {
    conductivityProbeOptions: [
      { value: 0, label: 'Disabled' },
      { value: 1, label: 'Enabled' },
      { value: 2, label: 'Not Installed' },
    ],
  },
  {
    waterMeterOptions: [
      { value: 0, label: '1 L/pulse' },
      { value: 1, label: '10 L/pulse' },
      { value: 2, label: '100 L/pulse' },
      { value: 3, label: '25mm pulse/L' },
      { value: 4, label: '32mm pulse/L' },
      { value: 5, label: '50mm pulse/L' },
      { value: 7, label: 'Other (7)' },
    ],
  },
  {
    fertilizerMeterOptions: [
      { value: 0, label: '0 Pulse/L' },
      { value: 1, label: '1000 Pulse/L' },
      { value: 2, label: 'Other (Unexpected)' },
      { value: 3, label: '1800-2200 Pulse/L' },
    ],
  },
  {
    fertilizerProbeOptions: [
      { value: 0, label: 'Fertilizer Decrement' },
      { value: 1, label: 'Pressure Mode' },
    ],
  },
  {
    telemetryModeOptions: [
      { value: 0, label: 'Disabled' },
      { value: 1, label: 'Enabled' },
    ],
  },
  {
    telemetryDemandMessagePacket: [
      { value: 20, label: 'Settings Update' },
      { value: 4, label: 'Four Hour Update' },
      { value: 24, label: '24 Hour Update' },
    ],
  },
];

export const FERTILIZER_PROBE_MODE = {
  0: 'Fertilizer Decrement',
  1: 'Pressure Mode',
};

export const DOSING_MODE = {
  0: 'Volume Dosing',
  1: 'Timed Dosing',
};

export const CONDUCTIVITY_PROBE_MODE = {
  0: 'Disabled',
  1: 'Enabled',
  2: 'Not Installed',
};

export const WATER_METER_MODE = {
  0: '1 L/pulse',
  1: '10 L/pulse',
  2: '100 L/pulse',
  3: '25mm pulse/L',
  4: '32mm pulse/L',
  5: '50mm pulse/L',
  7: 'Other (7)',
};

export const FERTILIZER_METER_MODE = {
  0: '0 Pulse/L',
  1: '1000 Pulse/L',
  2: 'Other (Unexpected)',
  3: '1800-2200 Pulse/L',
};

export const TELEMETRY_MODE = {
  0: 'Disabled',
  1: 'Enabled',
};

export default OPTIONS;
