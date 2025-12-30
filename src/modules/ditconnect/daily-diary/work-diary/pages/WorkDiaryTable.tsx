/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import { WorkDiaryListResponse, WorkDiaryResponse } from '../types/WorkDiary';
import {
  WORK_DIARY_EDIT,
  UPDATE_WORK_DIARY,
  WORK_DIARY_VIEW,
  DELETE_WORK_DIARY,
} from '../constants/constant';
import DeleteWorkDiary from './DeleteWorkDiary';

const WorkDiaryTable: React.FC<ListTableProps<WorkDiaryListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(WORK_DIARY_VIEW, row.id),
        permission: UPDATE_WORK_DIARY,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(WORK_DIARY_EDIT, row.id),
        permission: UPDATE_WORK_DIARY,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: 'Delete Daily Diary',
        modalContent: <DeleteWorkDiary workDiary={row} />,
        permission: DELETE_WORK_DIARY,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        containerClass="custom-dropdown"
        menuItems={menuItems}
      />
    );
  };

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
    {
      text: '',
      dataField: 'action',
      formatter: actionColumnFormatter,
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

export default WorkDiaryTable;
