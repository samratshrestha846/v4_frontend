import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';

import { CROP_ADD, CROP_LIST, CROP_EDIT } from '../../../constants/path';
import useFetchCropList from './hooks/useFetchCropList';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import { CREATE_CROP, UPDATE_CROP } from '../../../constants/permissions';
import { can } from '../../../helpers/checkPermission';
import { Crop } from '../../../types/horticulture/horticulture';
import { prepareDynamicUrl } from '../../../helpers';
import AddNewRecord from '../../../components/AddNewRecord';
import ActionDropdown from '../../../components/ActionDropdown';

const ListCrops: React.FC = () => {
  const { data, isFetching, isError, pageNumber, handlePageChange } =
    useFetchCropList();

  const canCreateCrops = can(CREATE_CROP);

  const actionColumnFormatter = (row: Crop) => {
    const menuItems = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(CROP_EDIT, row.id),
        permission: UPDATE_CROP,
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

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  const columns = [
    {
      text: 'Name',
      dataField: 'name',
    },
    {
      text: 'Life Span in days',
      dataField: 'life_span_in_days',
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
            label: 'Crop List',
            path: CROP_LIST,
            active: true,
          },
        ]}
        title="All Crops"
      />

      <Card>
        <Card.Body>
          <Row className="col-reverse">
            <Col className="mb-2">
              <div className="float-end d-flex gap-1 flex-wrap">
                {canCreateCrops && (
                  <AddNewRecord url={CROP_ADD} title="Add Crop" />
                )}
              </div>
            </Col>
          </Row>

          <CustomDataTable columns={columns} data={data!.body} />

          <Pagination
            data={data?.meta_data?.pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListCrops;
