const EXTRA_FILTER_COLUMNS = [
  {
    title: 'Communication',
    key: 'communication',
    filters: [
      {
        label: 'Alarmed',
        value: 'alarmed',
        isSelected: false,
      },
      {
        label: 'Stopped',
        value: 'stopped',
        isSelected: false,
      },
      {
        label: 'Running',
        value: 'running',
        isSelected: false,
      },
    ],
  },
  {
    title: 'Credit Expiry',
    key: 'creditExpiry',
    filters: [
      {
        label: 'Expired',
        value: 'expired',
        isSelected: false,
      },
      {
        label: 'Expiring this week',
        value: 'expiring-this-week',
        isSelected: false,
      },
      {
        label: 'Expiring this month',
        value: 'expiring-this-month',
        isSelected: false,
      },
    ],
  },
  {
    title: 'Device',
    key: 'device',
    filters: [
      {
        label: 'Device Not Attached',
        value: 'device-not-attached',
        isSelected: false,
      },
    ],
  },
  {
    title: 'Nutrient Level',
    key: 'nutrientLevel',
    filters: [
      {
        label: 'Less than 20%',
        value: 'less-than-twenty',
        isSelected: false,
      },
      {
        label: 'Between 20 and 50%',
        value: 'less-than-fifty',
        isSelected: false,
      },
      {
        label: 'Greater than 50%',
        value: 'grt-than-fifty',
        isSelected: false,
      },
    ],
  },
];

export default EXTRA_FILTER_COLUMNS;
