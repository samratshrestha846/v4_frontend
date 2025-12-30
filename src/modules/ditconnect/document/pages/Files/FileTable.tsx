import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import {
  customFileDownloader,
  formattedDatetime,
  prepareDynamicUrl,
} from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import { FileListResponse, FileResponse } from '../../types/Document';
import {
  DELETE_FILE,
  DOWNLOAD_FILE,
  FILE_EDIT,
  READ_FILE,
  UPDATE_FOLDER,
} from '../../constants/constant';
import DeleteFile from './DeleteFolder';
import HttpApi from '../../../Http/http';

const FileTable: React.FC<ListTableProps<FileListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const actionColumnFormatter = (row: FileResponse) => {
    const handleDownload = async () => {
      const response = await new HttpApi().downloadFile(
        prepareDynamicUrl(DOWNLOAD_FILE, row.id)
      );

      customFileDownloader({
        fileData: response.data,
        fileName: row.name,
        fileExtension: row.extension,
      });
    };

    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(FILE_EDIT, row.id),
        permission: UPDATE_FOLDER,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: 'Delete File',
        modalContent: <DeleteFile file={row} />,
        permission: DELETE_FILE,
      },
      {
        label: 'Download',
        icon: 'bx bx-download',
        actionMethod: handleDownload,
        permission: READ_FILE,
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

  const nameFormatter = (row: FileResponse) => {
    return `${row.created_by.first_name} ${row.created_by.last_name}`;
  };

  const columns: TableColumn[] = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'folder.name',
      text: 'Folder',
    },
    {
      dataField: 'created_by',
      text: 'Created by',
      formatter: nameFormatter,
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

export default FileTable;
