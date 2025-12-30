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
import {
  TravelDiaryListResponse,
  TravelDiaryResponse,
} from '../types/TravelDiary';
import { READ_TRAVEL_DIARY, TRAVEL_DIARY_VIEW } from '../constants/constant';

const TravelDiaryTable: React.FC<ListTableProps<TravelDiaryListResponse>> = ({
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
        url: prepareDynamicUrl(TRAVEL_DIARY_VIEW, row.id),
        permission: READ_TRAVEL_DIARY,
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
      dataField: 'user.name',
      text: 'User Name',
      formatter: (row: TravelDiaryResponse) =>
        row.user ? `${row.user.first_name} ${row.user.last_name}` : '-',
    },
    {
      dataField: 'date',
      text: 'Date',
      formatter: (row: TravelDiaryResponse) =>
        row.date ? formattedShortDate(row.date) : '-',
    },
    {
      dataField: 'vehicle.reg_number',
      text: 'Vehicle',
      formatter: (row: TravelDiaryResponse) =>
        row?.vehicle
          ? `${row.vehicle?.reg_number} - ${row.vehicle?.type} `
          : '-',
    },
    {
      dataField: 'total_kms',
      text: 'Total Distance',
    },
    {
      dataField: 'total_hours',
      text: 'Total Hours',
    },
    {
      dataField: 'action',
      text: '',
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

export default TravelDiaryTable;
