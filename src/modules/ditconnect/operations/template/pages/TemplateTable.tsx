import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { formattedDatetime, prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import { TemplateListResponse, TemplateResponse } from '../types/Template';
import {
  DELETE_TEMPLATE,
  READ_TEMPLATE,
  TEMPLATE_EDIT,
  TEMPLATE_VIEW,
  UPDATE_TEMPLATE,
} from '../constants/constant';
import DeleteTemplate from './DeleteTemplate';

const TemplateTable: React.FC<ListTableProps<TemplateListResponse>> = ({
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
        url: prepareDynamicUrl(TEMPLATE_VIEW, row.id),
        permission: READ_TEMPLATE,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(TEMPLATE_EDIT, row.id),
        permission: UPDATE_TEMPLATE,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: 'Delete Template',
        modalContent: <DeleteTemplate template={row} />,
        permission: DELETE_TEMPLATE,
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

  const columns: TableColumn[] = [
    {
      dataField: 'title',
      text: 'Title',
    },
    {
      dataField: 'created_by.name',
      text: 'Created By',
    },
    {
      dataField: 'updated_at',
      text: 'Last Published',
      formatter: (row: TemplateResponse) =>
        row.updated_at ? formattedDatetime(row.updated_at) : '-',
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

export default TemplateTable;
