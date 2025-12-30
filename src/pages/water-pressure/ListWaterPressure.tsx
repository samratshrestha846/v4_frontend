import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import {
  UDOSE_LIST,
  UDOSE_VIEW,
  WATER_PRESSURES_LIST_BY_SITE,
} from '../../constants/path';
import CustomDataTable from '../../components/CustomDataTable';
import {
  CREATE_WATER_PRESSURE,
  UPDATE_WATER_PRESSURE,
} from '../../constants/permissions';
import useListWaterPressure from './hooks/useListWaterPressure';
import { TableColumn } from '../../types/common';
import { WaterPressure } from '../../types/waterPressure';
import { formattedDatetime, prepareDynamicUrl } from '../../helpers';
import useModalFeature from '../../hooks/common/useModalFeature';
import { can } from '../../helpers/checkPermission';
import WaterPressureAddModal from './modals/WaterPressureAddModal';
import ActionDropdown from '../../components/ActionDropdown';
import EditWaterPressure from './EditWaterPressure';

const ListWaterPressure: React.FC = () => {
  const { id } = useParams();
  const canCreateWaterPressure = can(CREATE_WATER_PRESSURE);

  const { data, isFetching, isError, refetch } = useListWaterPressure(
    Number(id)
  );

  const { showModal, toggleModal } = useModalFeature();

  const actionColumnFormatter = (row: WaterPressure) => {
    const menuItems = [
      {
        label: 'Edit',
        icon: 'bx bx-pencil',
        actionKey: 'Edit Water Pressure',
        modalContent: (
          <EditWaterPressure
            toggleModal={toggleModal}
            siteId={row.site_id}
            refetch={refetch}
            id={row.id}
          />
        ),
        permission: UPDATE_WATER_PRESSURE,
      },
    ];
    return (
      <ActionDropdown
        menuItems={menuItems}
        containerClass="d-flex custom-dropdown align-items-center justify-content-between text-white"
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
        refetch={refetch}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      text: 'Water Pressure',
      dataField: 'pressure',
    },
    {
      text: 'Created At',
      dataField: 'created_at',
      formatter: (row: WaterPressure) =>
        row.created_at ? formattedDatetime(row.created_at) : '-',
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
          { label: 'Dashboard', path: '/' },
          { label: 'uDoses', path: UDOSE_LIST },
          {
            label: data?.name ?? 'uDose Site',
            path: prepareDynamicUrl(UDOSE_VIEW, id),
          },
          {
            label: 'Water Pressure',
            path: prepareDynamicUrl(WATER_PRESSURES_LIST_BY_SITE, id),
            active: true,
          },
        ]}
        title="Water Pressure"
      />
      <Card>
        <Card.Body>
          {canCreateWaterPressure && (
            <Row>
              <Col sm={12}>
                <div className="float-end">
                  <Button
                    variant="secondary"
                    className="btn btn-sm mb-2"
                    onClick={toggleModal}>
                    <i className="bx bx-plus me-1" /> Add Water Pressure
                  </Button>
                </div>
              </Col>
            </Row>
          )}

          {isFetching ? (
            <CustomLoader />
          ) : (
            <CustomDataTable
              columns={columns}
              data={data!.water_pressures ?? []}
            />
          )}
        </Card.Body>
      </Card>

      <WaterPressureAddModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetch={refetch}
        siteId={Number(id)}
      />
    </>
  );
};

export default ListWaterPressure;
