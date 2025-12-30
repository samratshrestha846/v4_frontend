/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { ListTableProps, TableColumn } from '@uhub/types/common';
import { SupplementSummaryListResponse } from '../types/SupplementSummary';

const SupplementSummaryTable: React.FC<
  ListTableProps<SupplementSummaryListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const columns: TableColumn[] = [
    {
      dataField: 'current_qty',
      text: 'Quantity',
    },
    {
      dataField: 'batch_number',
      text: 'Batch No.',
    },
    {
      dataField: 'location_name',
      text: 'Location',
    },
  ];

  const handlePageChange = (selectedItem: any) => {
    setFilters((prev: any) => ({
      ...prev,
      page: selectedItem.selected + 1,
    }));
  };

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <CustomDataTable columns={columns} data={data!.data} />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={Number(filters.page ?? 1) - 1}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default SupplementSummaryTable;
