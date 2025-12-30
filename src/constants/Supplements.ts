// Supplements constants
export const UPRO_ORANGE: string = 'uPro Orange';
export const UTRACE: string = 'uTrace';
export const UPRO_GREEN: string = 'uPro Green';
export const UPRO_ORANGE_HIGH_PHOS: string = 'uPro Orange High Phos';
export const UPRO_SOUTHERN: string = 'uPro Southern';
export const UCALM_WEANER: string = 'uCalm Weaner';
export const UCALM: string = 'uCalm';
export const UPRO_FORAGE: string = 'uPro Forage';
export const UPRO_MULGA: string = 'uPro Mulga';
export const UPRO_BLUE_WITH_AGOLIN: string = 'uPro Blue (Agolin)';

// Water and nutrient color
export const WATER_COLOR_CODE: string = '#20BDE7';

export const getNutrientCombinations = (nutrient: string) => {
  const defaultNutrientSet: string[] = [
    'phosphorus',
    'sulphur',
    'nitrogen',
    'urea_equivalent',
    'crude_protein',
  ];

  if (nutrient === UPRO_ORANGE) {
    return defaultNutrientSet;
  }
  if (nutrient === UTRACE) {
    return ['iodine', 'copper', 'cobalt', 'selenium', 'zinc', 'manganese'];
  }

  return defaultNutrientSet;
};

export const NUTRIENT_COLOR_CODE: Record<string, string> = {
  phosphorus: '#074891',
  sulphur: '#e1ce3b',
  nitrogen: '#0a7704',
  urea_equivalent: '#ADADAD',
  crude_protein: '#7a4517',
  iodine: '#6600bb',
  cobalt: '#d0d0d0',
  copper: '#c88033',
  zinc: '#7d80b0',
  selenium: '#ff2f93',
  manganese: '#9c7ac7',
  magnesium: '#198c19',
  sodium: '#ab5cf2',
  chloride: '#00bb00',
  PEG: '#90EE90',

  water: '#44badc',
  nutrient: '#ffbc00',
};
// supplement  color code
export const SUPPLEMENT_COLOR_CODE: Record<string, string> = {
  uProOrange: '#fb7c11',
  uProOrangeHigh: '#df6704',
  uProGreen: '#82c343',
  uProBlue: ' #355ee8',
  uProSouthern: '#455570',
  uProForage: '#ee9f22',
  uTrace: '#116a8e',
  uTetany: '#7e8ea6',
  uBloat: '#5f8368',
  uCalm: '#7656A4',
  uCalmWeaner: '#B3C964',
  uProMulga: '#B8627D',
};
export const SUPPLEMENTS: Record<string, string[]> = {
  'upro-orange': [
    'phosphorus',
    'nitrogen',
    'sulphur',
    'urea_equivalent',
    'crude_protein',
  ],
};

type LabelValue = { label: string; value: string };

type SupplementsMineralOptions = Record<string, LabelValue[]>;

export const SUPPLEMENTS_MINERAL_OPTIONS: SupplementsMineralOptions = {
  UPRO_ORANGE: [
    { label: 'Sulphur', value: 'sulphur' },
    { label: 'Nitrogen', value: 'nitrogen' },
    { label: 'Phosphorus', value: 'phosphorus' },
    { label: 'Urea Equivalent', value: 'urea_equivalent' },
    { label: 'Crude Protein', value: 'crude_protein' },
  ],
  UTRACE: [
    { label: 'Iodine', value: 'iodine' },
    { label: 'Copper', value: 'copper' },
    { label: 'Cobalt', value: 'cobalt' },
    { label: 'Selenium', value: 'selenium' },
    { label: 'Zinc', value: 'zinc' },
    { label: 'Manganese', value: 'manganese' },
  ],
  UPRO_GREEN: [
    { label: 'Sulphur', value: 'sulphur' },
    { label: 'Nitrogen', value: 'nitrogen' },
    { label: 'Phosphorus', value: 'phosphorus' },
    { label: 'Urea Equivalent', value: 'urea_equivalent' },
    { label: 'Crude Protein', value: 'crude_protein' },
  ],
  UPRO_ORANGE_HIGH_PHOS: [
    { label: 'Sulphur', value: 'sulphur' },
    { label: 'Nitrogen', value: 'nitrogen' },
    { label: 'Phosphorus', value: 'phosphorus' },
    { label: 'Urea Equivalent', value: 'urea_equivalent' },
    { label: 'Crude Protein', value: 'crude_protein' },
  ],
  UPRO_SOUTHERN: [
    { label: 'Sulphur', value: 'sulphur' },
    { label: 'uTrace', value: 'uTrace' },
    { label: 'Nitrogen', value: 'nitrogen' },
    { label: 'Phosphorus', value: 'phosphorus' },
    { label: 'Magnesium', value: 'magnesium' },
    { label: 'Urea Equivalent', value: 'urea_equivalent' },
    { label: 'Crude Protein', value: 'crude_protein' },
  ],
  UCALM_WEANER: [
    { label: 'uTrace', value: 'uTrace' },
    { label: 'Sulphur', value: 'sulphur' },
    { label: 'Dextrose', value: 'dextrose' },
    { label: 'Nitrogen', value: 'nitrogen' },
    { label: 'Magnesium', value: 'magnesium' },
    { label: 'Phosphorus', value: 'phosphorus' },
    { label: 'Flossy Salt', value: 'flossy_salt' },
    { label: 'Urea Equivalent', value: 'urea_equivalent' },
    { label: 'Crude Protein', value: 'crude_protein' },
  ],
  UCALM: [
    { label: 'uTrace', value: 'uTrace' },
    { label: 'Sulphur', value: 'sulphur' },
    { label: 'Dextrose', value: 'dextrose' },
    { label: 'Nitrogen', value: 'nitrogen' },
    { label: 'Magnesium', value: 'magnesium' },
    { label: 'Phosphorus', value: 'phosphorus' },
    { label: 'Flossy Salt', value: 'flossy_salt' },
    { label: 'Urea Equivalent', value: 'urea_equivalent' },
    { label: 'Crude Protein', value: 'crude_protein' },
  ],
  UPRO_FORAGE: [
    { label: 'uTrace', value: 'uTrace' },
    { label: 'Sulphur', value: 'sulphur' },
    { label: 'Nitrogen', value: 'nitrogen' },
    { label: 'Magnesium', value: 'magnesium' },
    { label: 'Phosphorus', value: 'phosphorus' },
    { label: 'Flossy Salt', value: 'flossy_salt' },
    { label: 'Urea Equivalent', value: 'urea_equivalent' },
    { label: 'Crude Protein', value: 'crude_protein' },
  ],
  UPRO_MULGA: [
    { label: 'Sulphur', value: 'sulphur' },
    { label: 'Nitrogen', value: 'nitrogen' },
    { label: 'Phosphorus', value: 'phosphorus' },
    { label: 'Urea Equivalent', value: 'urea_equivalent' },
    { label: 'Crude Protein', value: 'crude_protein' },
    { label: 'Polyethylene Glycol', value: 'PEG' },
  ],
  UPRO_BLUE_WITH_AGOLIN: [
    { label: 'DIT Trace Elements', value: 'dit_trace_elements' },
    { label: 'Agolin', value: 'agolin' },
  ],
};
