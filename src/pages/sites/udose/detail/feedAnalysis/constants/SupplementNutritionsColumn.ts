import { shortDateFormat } from '../../../../../../helpers/dateHelper';
import {
  SupplementFeedAnalysisRecord,
  TabularColumn,
} from '../../../../../../types/udose/supplementFeedAnalysis';

export const uproOrangeColumns = (): TabularColumn[] => {
  return [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      formatter: (row: SupplementFeedAnalysisRecord) =>
        shortDateFormat(row.message_date),
    },
    {
      dataField: 'water_flow',
      text: 'Water Flow (L)',
      sort: true,
    },
    {
      dataField: 'nutrient_flow',
      text: 'Nutrient Flow (mL)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.phosphorus',
      text: 'Phosphorus (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.nitrogen',
      text: 'Nitrogen (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.sulphur',
      text: 'Sulphur (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.urea_equivalent',
      text: 'Urea Equivalent (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.crude_protein',
      text: 'Crude Protein (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_in_ml',
      text: 'Total Nutrient (mL)',
      sort: true,
    },
  ];
};

export const utraceColumns = (): TabularColumn[] => {
  return [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      formatter: (row: SupplementFeedAnalysisRecord) =>
        shortDateFormat(row.message_date),
    },
    {
      dataField: 'water_flow',
      text: 'Water Flow (L)',
      sort: true,
    },
    {
      dataField: 'nutrient_flow',
      text: 'Nutrient Flow (mL)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.iodine',
      text: 'Iodine (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.copper',
      text: 'Copper (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.cobalt',
      text: 'Cobalt (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.selenium',
      text: 'Selenium (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.zinc',
      text: 'Zinc (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.manganese',
      text: 'Manganese (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_in_ml',
      text: 'Total Nutrient (mL)',
      sort: true,
    },
  ];
};

export const uproSouthernColumns = (): TabularColumn[] => {
  return [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      formatter: (row: SupplementFeedAnalysisRecord) =>
        shortDateFormat(row.message_date),
    },
    {
      dataField: 'water_flow',
      text: 'Water Flow (L)',
      sort: true,
    },
    {
      dataField: 'nutrient_flow',
      text: 'Nutrient Flow (mL)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.uTrace',
      text: 'uTrace (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.sulphur',
      text: 'Sulphur (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.nitrogen',
      text: 'Nitrogen (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.magnesium',
      text: 'Magnesium (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.phosphorus',
      text: 'Phosphorus (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.crude_protein',
      text: 'Crude Protein (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.urea_equivalent',
      text: 'Urea Eq. (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_in_ml',
      text: 'Total Nutrient (mL)',
      sort: true,
    },
  ];
};

export const ucalmColumns = (): TabularColumn[] => {
  return [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      formatter: (row: SupplementFeedAnalysisRecord) =>
        shortDateFormat(row.message_date),
    },
    {
      dataField: 'water_flow',
      text: 'Water Flow (L)',
      sort: true,
    },
    {
      dataField: 'nutrient_flow',
      text: 'Nutrient Flow (mL)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.uTrace',
      text: 'uTrace (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.sulphur',
      text: 'Sulphur (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.dextrose',
      text: 'Dextrose (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.nitrogen',
      text: 'Nitrogen (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.magnesium',
      text: 'Magnesium (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.phosphorus',
      text: 'Phosphorus (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.flossy_salt',
      text: 'Flossy Salt (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.crude_protein',
      text: 'Crude Protein (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.urea_equivalent',
      text: 'Urea Eq. (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_in_ml',
      text: 'Total Nutrient (mL)',
      sort: true,
    },
  ];
};

export const uproForageColumns = (): TabularColumn[] => {
  return [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      formatter: (row: SupplementFeedAnalysisRecord) =>
        shortDateFormat(row.message_date),
    },
    {
      dataField: 'water_flow',
      text: 'Water Flow (L)',
      sort: true,
    },
    {
      dataField: 'nutrient_flow',
      text: 'Nutrient Flow (mL)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.uTrace',
      text: 'uTrace (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.sulphur',
      text: 'Sulphur (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.nitrogen',
      text: 'Nitrogen (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.magnesium',
      text: 'Magnesium (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.phosphorus',
      text: 'Phosphorus (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.flossy_salt',
      text: 'Flossy Salt (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.crude_protein',
      text: 'Crude Protein (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.urea_equivalent',
      text: 'Urea Eq. (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_in_ml',
      text: 'Total Nutrient (mL)',
      sort: true,
    },
  ];
};

export const uproMulgaColumns = (): TabularColumn[] => {
  return [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      formatter: (row: SupplementFeedAnalysisRecord) =>
        shortDateFormat(row.message_date),
    },
    {
      dataField: 'water_flow',
      text: 'Water Flow (L)',
      sort: true,
    },
    {
      dataField: 'nutrient_flow',
      text: 'Nutrient Flow (mL)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.sulphur',
      text: 'Sulphur (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.nitrogen',
      text: 'Nitrogen (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.phosphorus',
      text: 'Phosphorus (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.crude_protein',
      text: 'Crude Protein (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.urea_equivalent',
      text: 'Urea Eq. (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.PEG',
      text: 'Polyethylene Glycol (mL)',
      sort: true,
    },
    {
      dataField: 'nutrient_in_ml',
      text: 'Total Nutrient (mL)',
      sort: true,
    },
  ];
};

export const uproBlueWithAgolinColumns = (): TabularColumn[] => {
  return [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      formatter: (row: SupplementFeedAnalysisRecord) =>
        shortDateFormat(row.message_date),
    },
    {
      dataField: 'water_flow',
      text: 'Water Flow (L)',
      sort: true,
    },
    {
      dataField: 'nutrient_flow',
      text: 'Nutrient Flow (mL)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.dit_trace_elements',
      text: 'DIT Trace Elements (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_breakdown.agolin',
      text: 'Agolin (g)',
      sort: true,
    },
    {
      dataField: 'nutrient_in_ml',
      text: 'Total Nutrient (mL)',
      sort: true,
    },
  ];
};
