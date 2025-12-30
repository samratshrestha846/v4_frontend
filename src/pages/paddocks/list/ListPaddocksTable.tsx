/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '../../../components/CustomLoader';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import {
  Paddock,
  PaddockListResponse,
} from '../../../types/horticulture/paddock';
import {
  DELETE_PADDOCK,
  READ_PADDOCK,
  UPDATE_PADDOCK,
} from '../../../constants/permissions';
import { prepareDynamicUrl } from '../../../helpers';
import { PADDOCK_EDIT, PADDOCK_VIEW } from '../../../constants/path';
import ACTION_DELETE_PADDOCK from '../constants/actionConstants';
import ActionDropdown from '../../../components/ActionDropdown';
import DeletePaddockModal from '../modal/DeletePaddockModal';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  data?: PaddockListResponse;
  handlePageChange: (e: any) => void;
  refetch: () => void;
};

const ListPaddocksTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  data,
  handlePageChange,
  refetch,
}) => {
  const actionColumnFormatter = (row: Paddock) => {
    const menuItems = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(PADDOCK_VIEW, row.id),
        permission: READ_PADDOCK,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(PADDOCK_EDIT, row.id),
        permission: UPDATE_PADDOCK,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: ACTION_DELETE_PADDOCK,
        modalContent: (
          <DeletePaddockModal paddockId={row.id} refetch={refetch} />
        ),
        permission: DELETE_PADDOCK,
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

  const columns = [
    {
      dataField: 'name',
      text: 'Paddock',
    },
    {
      dataField: 'customer.business_name',
      text: 'Customer',
    },
    {
      dataField: 'customer_property.name',
      text: 'Property',
    },
    {
      dataField: 'blocks_count',
      text: 'No. of Blocks',
      formatter: (row: Paddock) => row?.blocks_count,
    },
    {
      dataField: '',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <CustomDataTable columns={columns} data={data!.body} />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default ListPaddocksTable;
