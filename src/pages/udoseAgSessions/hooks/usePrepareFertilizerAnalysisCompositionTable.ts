import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../../helpers';
import { TableColumn } from '../../../types/common';
import { SessionSummaryFertilizerAnalysis } from '../../../types/udoseAgs/udoseAgs';
import commaSeperatedNumber from '../../../helpers/numberHelper';

type TableData = {
  composition: string;
  quantity: string;
};

export default function usePrepareFertilizerAnalysisCompositionTable(
  fertilizerAnalysis?: SessionSummaryFertilizerAnalysis
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableData[]>([]);

  const prepareTableData = (initialData: SessionSummaryFertilizerAnalysis) => {
    const rowData: TableData[] = [];

    if (!initialData || initialData.fertilizer_composition === null) {
      return rowData;
    }

    const fertilizationComposition = initialData.fertilizer_composition;

    const dataFields: string[] = Object.keys(fertilizationComposition);

    dataFields.forEach((key) => {
      rowData.push({
        quantity: `${commaSeperatedNumber(fertilizationComposition[key])} g`,
        composition: capitalizeFirstLetter(key),
      });
    });
    return rowData;
  };

  useEffect(() => {
    if (!fertilizerAnalysis) return;
    setLoading(true);
    setData(prepareTableData(fertilizerAnalysis));
    setLoading(false);
  }, [fertilizerAnalysis]);

  const columns: TableColumn[] = [
    {
      dataField: 'composition',
      text: 'Composition',
    },
    {
      dataField: 'quantity',
      text: 'Quantity',
    },
  ];

  return { loading, columns, data };
}
