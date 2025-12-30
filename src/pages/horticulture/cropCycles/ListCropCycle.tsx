import React from 'react';
import { Card, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { CROP_CYCLE_EDIT, CROP_CYCLE_LIST } from '../../../constants/path';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import useFetchCropCycleList from './hooks/useFetchCropCycleList';
import {
  DELETE_CROP_LIFE_CYCLE,
  UPDATE_CROP_LIFE_CYCLE,
} from '../../../constants/permissions';
import { prepareDynamicUrl } from '../../../helpers';
import { CropLifeCycle } from '../../../types/horticulture/horticulture';
import ACTION_DELETE_CROP_CYCLE from './constants/actionConstants';
import ActionDropdown from '../../../components/ActionDropdown';
import DeleteCropCycleModal from './modal/DeleteCropCycleModal';
import FilterCropCycleSection from './FilterCropCycleSection';
import useCropsDropdown from '../../../hooks/dropdown/useCropsDropdown';

const ListCropCycle: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    handlePageChange,
    crop,
    setCrop,
  } = useFetchCropCycleList();

  const { data: cropsOption } = useCropsDropdown();

  const actionColumnFormatter = (row: CropLifeCycle) => {
    const menuItems = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(CROP_CYCLE_EDIT, row.id),
        permission: UPDATE_CROP_LIFE_CYCLE,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: ACTION_DELETE_CROP_CYCLE,
        modalContent: (
          <DeleteCropCycleModal cropCycleId={row.id} refetch={refetch} />
        ),
        permission: DELETE_CROP_LIFE_CYCLE,
      },
    ];

    return (
      <ActionDropdown
        menuItems={menuItems}
        containerClass="d-flex align-items-center justify-content-between text-white custom-dropdown"
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
        refetch={refetch}
      />
    );
  };

  if (isError) return <ErrorMessage />;

  const columns = [
    {
      text: 'Crop',
      dataField: 'crop.name',
    },
    {
      text: 'Crop Stage',
      dataField: 'crop_stage_name',
    },
    {
      text: 'Started in days',
      dataField: 'started_in_days',
    },
    {
      text: 'Ended in days',
      dataField: 'ended_in_days',
    },
    {
      text: '',
      dataField: '',
      formatter: actionColumnFormatter,
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Crop Cycle List',
            path: CROP_CYCLE_LIST,
            active: true,
          },
        ]}
        title="All Crop Cycles"
      />

      <Card>
        <Card.Body>
          <Row className="col-reverse">
            {cropsOption && (
              <FilterCropCycleSection
                crop={crop}
                setCrop={setCrop}
                cropsOption={cropsOption}
              />
            )}
          </Row>
          {isFetching ? (
            <CustomLoader />
          ) : (
            <>
              <CustomDataTable columns={columns} data={data!.body} />
              <Pagination
                data={data?.meta_data?.pagination}
                pageNumber={pageNumber}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ListCropCycle;
