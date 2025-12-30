import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { convertToSentence, prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { StaffListResponse, StaffResponse } from '../types/Staff';
import {
  READ_STAFF,
  STAFF_EDIT,
  STAFF_VIEW,
  UPDATE_STAFF,
} from '../constants/constant';
import { STATUS_ACTIVE } from '../../../../constants/constants';
import DeactivateStatus from './DeactiveStatus';

const StaffTable: React.FC<ListTableProps<StaffListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const activeInactiveColumnFormatter = (row: StaffResponse) => {
    return (
      <IconLabelStatus
        iconTextClass={
          row.status === String(STATUS_ACTIVE)
            ? 'text-success'
            : 'text-light-gray'
        }
        label={row.status === String(STATUS_ACTIVE) ? 'Active' : 'Inactive'}
      />
    );
  };

  const nameFormatter = (row: StaffResponse) => {
    return `${row.user.first_name} ${row.user.last_name}`;
  };

  const actionColumnFormatter = (row: StaffResponse) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(STAFF_EDIT, row.id),
        permission: UPDATE_STAFF,
      },
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(STAFF_VIEW, row.id),
        permission: READ_STAFF,
      },
    ];

    if (row.status === String(STATUS_ACTIVE)) {
      menuItems.push({
        label: 'Deactivate',
        icon: 'bx bx-user-x',
        actionKey: 'Deactivate',
        modalContent: <DeactivateStatus staff={row} />,
        permission: UPDATE_STAFF,
      });
    }

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
      dataField: 'user',
      text: 'Name',
      formatter: nameFormatter,
    },
    {
      dataField: 'user.email',
      text: 'Email',
    },
    {
      dataField: 'role',
      text: 'Role',
      formatter: (row: StaffResponse) => convertToSentence(row.role),
    },
    {
      dataField: 'mobile_number',
      text: 'Mobile no.',
    },
    {
      dataField: 'department',
      text: 'Department',
    },
    {
      dataField: 'position',
      text: 'Position',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: activeInactiveColumnFormatter,
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

export default StaffTable;
