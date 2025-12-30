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
import {
  ACCESS_FILE,
  DELETE_FOLDER,
  FOLDER_EDIT,
  FOLDER_VIEW,
  UPDATE_FOLDER,
} from '../../constants/constant';
import { FolderListResponse } from '../../types/Document';
import DeleteFolder from './DeleteFolder';

const FolderTable: React.FC<ListTableProps<FolderListResponse>> = ({
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
        url: prepareDynamicUrl(FOLDER_VIEW, row.id),
        permission: ACCESS_FILE,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(FOLDER_EDIT, row.id),
        permission: UPDATE_FOLDER,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: 'Delete Folder',
        modalContent: <DeleteFolder folder={row} />,
        permission: DELETE_FOLDER,
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
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'created_at',
      text: 'Created at',
      formatter: (row: any) =>
        row.created_at ? formattedDatetime(row.created_at) : '-',
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

export default FolderTable;
