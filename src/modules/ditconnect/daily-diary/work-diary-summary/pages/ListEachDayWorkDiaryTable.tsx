/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { formattedShortDate } from '@uhub/helpers';
import { ListTableProps, TableColumn } from '@uhub/types/common';
import {
  WorkDiaryListResponse,
  WorkDiaryResponse,
} from '../../work-diary/types/WorkDiary';

const ListEachDayWorkDiaryTable: React.FC<
  ListTableProps<WorkDiaryListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const columns: TableColumn[] = [
    {
      text: 'User Name',
      dataField: 'user.name',
      formatter: (row: WorkDiaryResponse) =>
        row.user ? `${row.user.first_name} ${row.user.last_name}` : '-',
    },
    {
      text: 'Date',
      dataField: 'date',
      formatter: (row: WorkDiaryResponse) =>
        row.date ? formattedShortDate(row.date) : '-',
    },
    {
      text: 'R&D Hour',
      dataField: 'rnd_hours',
    },
    {
      text: 'Non-R&D Hour',
      dataField: 'non_rnd_hours',
    },
    {
      text: 'Total Hour',
      dataField: 'total_hours',
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

export default ListEachDayWorkDiaryTable;
