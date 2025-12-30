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
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import {
  FleetVehicleListResponse,
  FleetVehicleResponse,
} from '../types/FleetVehicle';
import {
  FLEET_VEHICLE_EDIT,
  FLEET_VEHICLE_STATUS_ACTIVE,
  FLEET_VEHICLE_STATUS_INACTIVE,
  FLEET_VEHICLE_VIEW,
  READ_FLEET_VEHICLE,
  UPDATE_FLEET_VEHICLE,
} from '../constants/constant';

const FleetVehicleTable: React.FC<ListTableProps<FleetVehicleListResponse>> = ({
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
        url: prepareDynamicUrl(FLEET_VEHICLE_VIEW, row.id),
        permission: READ_FLEET_VEHICLE,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(FLEET_VEHICLE_EDIT, row.id),
        permission: UPDATE_FLEET_VEHICLE,
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

  const statusColumnFormatter = (row: FleetVehicleResponse) => {
    return (
      <IconLabelStatus
        label={
          row.status === FLEET_VEHICLE_STATUS_ACTIVE
            ? FLEET_VEHICLE_STATUS_ACTIVE
            : FLEET_VEHICLE_STATUS_INACTIVE
        }
        iconTextClass={
          row.status === FLEET_VEHICLE_STATUS_ACTIVE
            ? 'text-success'
            : 'text-light-gray'
        }
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'reg_number',
      text: 'Reg. Number',
    },
    {
      dataField: 'type',
      text: 'Type',
    },
    {
      dataField: 'purchased_date',
      text: 'Purchased Date',
      formatter: (row: FleetVehicleResponse) =>
        row.purchased_date ? formattedShortDate(row.purchased_date) : '-',
    },
    {
      dataField: 'next_service',
      text: 'Next Service',
    },
    {
      dataField: 'rego_until',
      text: 'Rego Until',
      formatter: (row: FleetVehicleResponse) =>
        row.rego_until ? formattedShortDate(row.rego_until) : '-',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusColumnFormatter,
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
        data={data?.meta_data?.pagination}
        pageNumber={Number(filters?.page ?? 1) - 1}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default FleetVehicleTable;
