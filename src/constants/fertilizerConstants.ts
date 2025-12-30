type FertilizerNutrient = {
  key: string;
  name: string;
  symbol: string;
};

const FERTILIZER_NUTRIENTS: FertilizerNutrient[] = [
  { key: 'nitrogen', name: 'Nitrogen', symbol: 'N' },
  { key: 'phosphorus', name: 'Phosphorus', symbol: 'P' },
  { key: 'sulpher', name: 'Sulpher', symbol: 'S' },
  { key: 'calcium', name: 'Calcium', symbol: 'Ca' },
  { key: 'potassium', name: 'Potassium', symbol: 'K' },
  { key: 'magnesium', name: 'Magnesium', symbol: 'Mg' },
  { key: 'zinc', name: 'Zinc', symbol: 'Zn' },
  { key: 'chlorine', name: 'Chlorine', symbol: 'Cl' },
];

export default FERTILIZER_NUTRIENTS;
