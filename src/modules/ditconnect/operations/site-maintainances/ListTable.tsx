/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { Sale } from '@uhub/types/sale/saleList';
import { prepareDynamicUrl, shortDateFormat } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  QueryParam,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import ErrorMessage from '@uhub/components/ErrorMessage';
import {
  SiteMaintenanceListResponse,
  SiteMaintenanceResponse,
} from './types/siteMaintenance';
import {
  SITE_MAINTENANCE_EDIT,
  UPDATE_SITE_MAINTENANCE,
} from './constants/constant';

const ListTable: React.FC<ListTableProps<SiteMaintenanceListResponse>> = ({
  isFetching,
  isError,
  data,
  filters,
  setFilters,
}) => {
  const actionColumnFormatter = (row: Sale) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(SITE_MAINTENANCE_EDIT, row.id),
        permission: UPDATE_SITE_MAINTENANCE,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="font-14 text-gray"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'site_name',
      text: 'Site',
    },
    {
      dataField: 'customer_property_name',
      text: 'Customer Property',
    },
    {
      dataField: 'device_serial_number',
      text: 'Device Serial No.',
    },
    {
      dataField: 'date',
      text: 'Date',

      formatter: (row: SiteMaintenanceResponse) => {
        return shortDateFormat(row.date);
      },
    },
    {
      dataField: 'created_by.first_name',
      text: 'Created By',
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
  if (isError) return <ErrorMessage />;

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

export default ListTable;
