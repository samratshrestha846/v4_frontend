/* eslint-disable no-unused-vars */
import { ReactNode, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import * as Supplements from '../../../../../../constants/Supplements';
import * as SupplementColumn from '../constants/SupplementNutritionsColumn';
import { SupplementFeedAnalysisRecord } from '../../../../../../types/udose/supplementFeedAnalysis';

type Props = {
  supplement: string;
  data: SupplementFeedAnalysisRecord[];
  expandRow?: (row: any) => ReactNode;
};

export default function useTableWithExpandRows({
  supplement,
  data,
  expandRow,
}: Props) {
  const [expandColumn, setExpandColumn] = useState<any[]>();

  // paginate the data
  const [pageNumber, setPageNumber] = useState(0);
  const [pageData, setPageData] = useState<any[]>([]);
  const [dataPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const pagesVisited = pageNumber * dataPerPage;
    const displayData = data?.slice(pagesVisited, pagesVisited + dataPerPage);
    setPageData(displayData);
    setPageCount(Math.ceil(data.length / dataPerPage));
  }, [data, pageNumber, dataPerPage]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };

  useEffect(() => {
    if (expandRow) {
      setExpandColumn(columns);
    }
  }, [columns]);

  const handleSearchTerm = debounce((searchText: string) => {
    setSearchTerm(searchText);
    setPageNumber(0);
    const filteredData = data.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setPageData(filteredData.slice(0, dataPerPage));
    setPageCount(Math.ceil(filteredData.length / dataPerPage));
  }, 300);

  useEffect(() => {
    // default
    setColumns(SupplementColumn.uproOrangeColumns());

    if (supplement === Supplements.UPRO_ORANGE) {
      setColumns(SupplementColumn.uproOrangeColumns());
    }

    if (supplement === Supplements.UPRO_SOUTHERN) {
      setColumns(SupplementColumn.uproSouthernColumns());
    }
    if (
      supplement === Supplements.UCALM ||
      supplement === Supplements.UCALM_WEANER
    ) {
      setColumns(SupplementColumn.ucalmColumns());
    }

    if (supplement === Supplements.UTRACE) {
      setColumns(SupplementColumn.utraceColumns());
    }

    if (supplement === Supplements.UPRO_FORAGE) {
      setColumns(SupplementColumn.uproForageColumns());
    }

    if (supplement === Supplements.UPRO_MULGA) {
      setColumns(SupplementColumn.uproMulgaColumns());
    }

    if (supplement === Supplements.UPRO_BLUE_WITH_AGOLIN) {
      setColumns(SupplementColumn.uproBlueWithAgolinColumns());
    }
    setLoading(false);
  }, []);

  return {
    handlePageChange,
    handleSearchTerm,
    pageCount,
    pageData,
    searchTerm,
    loading,
    expandColumn,
    columns,
    pageNumber,
    dataPerPage,
    isOpen,
    setIsOpen,
  };
}
