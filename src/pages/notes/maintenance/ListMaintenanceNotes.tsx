import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useListMaintenanceNotes from './hooks/useListMaintenanceNote';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import { CustomDropdownMenuItem, TableColumn } from '../../../types/common';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import FilterMaintenanceNotes from './FilterMaintenanceNotes';
import { can } from '../../../helpers/checkPermission';
import {
  READ_DEVICE,
  READ_NOTE_DEVICE_MAINTENANCE,
} from '../../../constants/permissions';
import { formattedShortDate, prepareDynamicUrl } from '../../../helpers';
import { DEVICE_VIEW, MAINTENANCE_NOTE_VIEW } from '../../../constants/path';
import { MaintenanceNote } from '../../../types/notes/maintenance';
import ActionDropdown from '../../../components/ActionDropdown';

const ListMaintenanceNotes: React.FC = () => {
  const {
    pageNumber,
    sort,
    direction,
    data,
    isFetching,
    isError,
    handlePageChange,
    handleTabeDataSorting,
    duration,
    setDuration,
    property,
    setProperty,
    serialNumber,
    setSerialNumber,
    performer,
    setPerformer,
  } = useListMaintenanceNotes();

  const canReadDevice = can(READ_DEVICE);

  const serialNumberFormatter = (row: MaintenanceNote) => {
    return canReadDevice && row.device_serial_number ? (
      <Link
        to={prepareDynamicUrl(DEVICE_VIEW, row.device_id)}
        className="text-primary fw-medium">
        {row.device_serial_number.toUpperCase()}
      </Link>
    ) : (
      (row.device_serial_number?.toUpperCase() ?? '-')
    );
  };

  const actionColumnFormatter = (row: MaintenanceNote) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(MAINTENANCE_NOTE_VIEW, row.id),
        permission: READ_NOTE_DEVICE_MAINTENANCE,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'date',
      text: 'Date',
      formatter: (row: any) => (row.date ? formattedShortDate(row.date) : '-'),
    },
    { dataField: 'customer_property_name', text: 'Property' },
    { dataField: 'site_name', text: 'Site' },
    {
      dataField: 'device_serial_number',
      text: 'Device Serial No.',
      formatter: serialNumberFormatter,
    },
    { dataField: 'performer.name', text: 'Note Taker' },
    { dataField: 'action', text: '', formatter: actionColumnFormatter },
  ];

  if (isError) return <ErrorMessage />;

  return (
    <Card>
      <Card.Body>
        <FilterMaintenanceNotes
          duration={duration}
          setDuration={setDuration}
          property={property}
          setProperty={setProperty}
          serialNumber={serialNumber}
          setSerialNumber={setSerialNumber}
          performer={performer}
          setPerformer={setPerformer}
        />

        {isFetching ? (
          <CustomLoader />
        ) : (
          <>
            <CustomDataTable
              columns={columns}
              data={data!.body}
              sort={sort}
              direction={direction}
              handleTabeDataSorting={handleTabeDataSorting}
            />

            <Pagination
              data={data?.meta_data?.pagination}
              pageNumber={pageNumber}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ListMaintenanceNotes;
