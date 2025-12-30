import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import ErrorMessage from '../../components/ErrorMessage';
import useListTransportEmissions from './hooks/useListTransportEmissions';
import { TRANSPORT_EMISSION_LIST } from '../../constants/path';
import useModalFeature from '../../hooks/common/useModalFeature';
import CustomLoader from '../../components/CustomLoader';
import CustomDataTable from '../../components/CustomDataTable';
import { CustomDropdownMenuItem, TableColumn } from '../../types/common';
import { TransportEmission } from '../../types/transportEmission';
import { formattedShortDate } from '../../helpers';
import Pagination from '../../components/Pagination';
import { can } from '../../helpers/checkPermission';
import {
  CREATE_TRANSPORT_EMISSION,
  UPDATE_TRANSPORT_EMISSION,
} from '../../constants/permissions';
import FilterTransportEmission from './FilterTransportEmission';
import AddTransportEmissionModal from './modals/AddTransportEmissionModal';
import ActionDropdown from '../../components/ActionDropdown';
import EditTransportEmission from './EditTransportEmission';

const ListTransportEmissions: React.FC = () => {
  const canCreateTransportEmission = can(CREATE_TRANSPORT_EMISSION);

  const {
    isFetching,
    isError,
    data,
    search,
    sort,
    direction,
    handlePageChange,
    pageNumber,
    handleSearchOnChange,
    refetch,
    handleTabeDataSorting,
    setSearch,
  } = useListTransportEmissions();

  const { showModal, toggleModal } = useModalFeature();

  const actionColumnFormatter = (row: TransportEmission) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-pencil',
        actionKey: 'Edit Transport Emission',
        modalContent: (
          <EditTransportEmission
            toggleModal={toggleModal}
            transportEmissionDetail={row}
            refetch={refetch}
          />
        ),
        permission: UPDATE_TRANSPORT_EMISSION,
      },
    ];
    return (
      <ActionDropdown
        menuItems={menuItems}
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
        refetch={refetch}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      text: 'Origin',
      dataField: 'origin',
      sortable: true,
    },
    {
      text: 'Destination',
      dataField: 'destination',
      sortable: true,
    },
    {
      text: 'Distance (km)',
      dataField: 'distance',
      sortable: true,
    },
    {
      text: 'Vehicle',
      dataField: 'vehicle',
      sortable: true,
    },
    {
      text: 'Emission Per Kg',
      dataField: 'emission_per_kg',
      sortable: true,
    },
    {
      text: 'Created At',
      dataField: 'created_at',
      sortable: true,
      formatter: (row: TransportEmission) =>
        row.created_at ? formattedShortDate(row.created_at) : '-',
      format: true,
    },
    {
      text: '',
      dataField: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Trasnport Emissions',
            path: TRANSPORT_EMISSION_LIST,
            active: true,
          },
        ]}
        title="Trasnport Emissions"
      />

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap mb-2">
            <FilterTransportEmission
              handleSearchOnChange={handleSearchOnChange}
              search={search}
              setSearch={setSearch}
            />
            {canCreateTransportEmission && (
              <div className="float-end">
                <Button
                  variant="secondary"
                  className="btn btn-sm mb-2"
                  onClick={toggleModal}>
                  <i className="bx bx-plus me-1" /> Add Transport Emission
                </Button>
              </div>
            )}
          </div>

          {isFetching ? (
            <CustomLoader />
          ) : (
            <>
              <CustomDataTable
                columns={columns}
                data={data!.data}
                sort={sort}
                direction={direction}
                handleTabeDataSorting={handleTabeDataSorting}
              />

              <Pagination
                data={data!.meta}
                pageNumber={pageNumber}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </Card.Body>
      </Card>
      <AddTransportEmissionModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetch={refetch}
      />
    </>
  );
};

export default ListTransportEmissions;
