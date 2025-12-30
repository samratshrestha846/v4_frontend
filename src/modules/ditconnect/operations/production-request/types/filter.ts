const ProductionFacilityStatus = {
  TODO: 'To-Do',
  IN_PRODUCTION: 'In-Production',
  READY: 'Ready to Dispatch',
} as const;

const productionFacilityOptions = Object.entries(ProductionFacilityStatus).map(
  ([, value]) => ({
    label: value,
    value,
  })
);
const statusColorOptions = [
  {
    key: ProductionFacilityStatus.TODO,
    value: 'bg-yellow-200 text-yellow-900',
  },
  {
    key: ProductionFacilityStatus.IN_PRODUCTION,
    value: 'bg-green-200 text-green-900',
  },
  {
    key: ProductionFacilityStatus.READY,
    value: 'bg-emerald-200 text-emerald-900',
  },
];
export {
  productionFacilityOptions,
  ProductionFacilityStatus,
  statusColorOptions,
};
