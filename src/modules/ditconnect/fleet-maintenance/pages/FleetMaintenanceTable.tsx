/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { can } from '@uhub/helpers/checkPermission';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import ActionDropdown from '@uhub/components/ActionDropdown';
import FormattedDateTime from '@uhub/components/FormattedDateTime';

import { prepareDynamicUrl } from '@uhub/helpers';

import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';

import {
  FleetMaintenanceListResponse,
  FleetMaintenanceResponse,
} from '../types/FleetMaintenance';
import {
  FLEET_MAINTENANCE_STATUS_COMPLETED,
  FLEET_MAINTENANCE_VIEW,
  READ_FLEET_MAINTENANCE,
} from '../constants/constant';

import FleetMaintenanceStatus from './components/FleetMaintenanceStatus';
import MarkAsCompletedFleetMaintenance from './MarkAsCompletedFleetMaintenance';
import {
  FLEET_VEHICLE_VIEW,
  READ_FLEET_VEHICLE,
} from '../../fleet-vehicle/constants/constant';

const FleetMaintenanceTable: React.FC<
  ListTableProps<FleetMaintenanceListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const canReadVehicle = can(READ_FLEET_VEHICLE);

  const actionColumnFormatter = (row: FleetMaintenanceResponse) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(FLEET_MAINTENANCE_VIEW, row.id),
        permission: READ_FLEET_MAINTENANCE,
      },
    ];

    if (row.maintenance_status !== FLEET_MAINTENANCE_STATUS_COMPLETED) {
      menuItems.push({
        label: 'Mark as Completed',
        icon: 'bx bx-check',
        actionKey: 'Mark as Completed',
        modalContent: (
          <MarkAsCompletedFleetMaintenance
            maintenance={row}
            toggleModal={() => {}}
          />
        ),
        permission: READ_FLEET_MAINTENANCE,
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

  const submittedOnColumnFormatter = (row: FleetMaintenanceResponse) => {
    return row?.created_at ? (
      <FormattedDateTime dataTime={row.created_at} />
    ) : (
      '-'
    );
  };

  const statusColumnFormatter = (row: FleetMaintenanceResponse) => {
    return <FleetMaintenanceStatus status={row.maintenance_status} />;
  };

  const registrationNumberColumnFormatter = (row: FleetMaintenanceResponse) => {
    return (
      <div className="d-flex flex-column align-items-start">
        {canReadVehicle ? (
          <Link
            className="m-0 text-nowrap"
            to={prepareDynamicUrl(FLEET_VEHICLE_VIEW, row?.vehicle?.id)}>
            {row?.vehicle?.reg_number ?? ''}
          </Link>
        ) : (
          <p className="m-0 text-nowrap"> {row?.vehicle?.reg_number ?? ''}</p>
        )}
        <small className="text-slate-gray">{row?.no_of_kms ?? ''} Km</small>
      </div>
    );
  };

  const columns: TableColumn[] = [
    {
      text: 'Reported By',
      dataField: 'reported_by_user.name',
      formatter: (row: FleetMaintenanceResponse) =>
        row.reported_by_user
          ? `${row.reported_by_user?.first_name} ${row.reported_by_user?.last_name}`
          : '-',
    },
    {
      text: 'Reg. Number',
      dataField: 'vehicle.reg_number',
      formatter: registrationNumberColumnFormatter,
    },
    {
      text: 'Type',
      dataField: 'maintenance_type',
    },
    {
      text: 'Location',
      dataField: 'location',
    },
    {
      text: 'Windscreen',
      dataField: 'windscreen',
    },
    {
      text: 'Tyre Condition',
      dataField: 'tyre_condition',
    },
    {
      text: 'IOR Tag No.',
      dataField: 'fleet_card_number',
    },
    {
      text: 'Submitted On',
      dataField: 'created_at',
      formatter: submittedOnColumnFormatter,
    },

    {
      text: 'Status',
      dataField: 'status',
      formatter: statusColumnFormatter,
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

export default FleetMaintenanceTable;
