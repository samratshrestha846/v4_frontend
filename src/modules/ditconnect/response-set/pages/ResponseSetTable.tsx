import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import { Badge } from 'react-bootstrap';
import {
  ResponseSetListResponse,
  ResponseSetResponse,
} from '../types/ResponseSet';
import {
  DELETE_RESPONSE_SET,
  RESPONSE_SET_EDIT,
  UPDATE_RESPONSE_SET,
} from '../constants/constant';
import DeleteResponseSet from './DeleteResponseSet';

const ResponseSetTable: React.FC<ListTableProps<ResponseSetListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(RESPONSE_SET_EDIT, row.id),
        permission: UPDATE_RESPONSE_SET,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: 'Delete Response set',
        modalContent: <DeleteResponseSet responseSet={row} />,
        permission: DELETE_RESPONSE_SET,
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

  const itemsColumnFormatter = (row: ResponseSetResponse) => {
    return (
      <ul className="custom-list m-0 p-0 d-flex flex-wrap gap-1">
        {row?.items?.map((item) => (
          <li key={item} className="mb-1">
            <Badge className="badge-outline-secondary font-12">{item}</Badge>
          </li>
        ))}
      </ul>
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'type',
      text: 'Type',
    },
    {
      dataField: 'items',
      text: 'Items',
      formatter: itemsColumnFormatter,
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

export default ResponseSetTable;
