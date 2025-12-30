/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import {
  customFileDownloader,
  prepareDynamicUrl,
  shortDateFormat,
} from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import {
  TaskListResponse,
  TaskResponse,
  taskStatusColorOptions,
  taskStatusOptions,
} from '../types/Task';
import {
  TASK_EDIT,
  UPDATE_TASK,
  READ_TASK,
  TASK_VIEW,
  TASK,
  DELETE_TASK,
  TASK_PREVIEW_PDF,
} from '../constants/constant';
import UpdateStatus from '../../../components/UpdateStatus';
import DeleteModal from '../../../components/DeleteModal';
import usePreviewPdfTask from '../hooks/usePreviewPdfTask';
import HttpApi from '../../../Http/http';

const TaskTable: React.FC<ListTableProps<TaskListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const actionColumnFormatter = (row: any) => {
    // const { handleDownloadPdf } = usePreviewPdfTask(row.id);
    const handleDownloadPdf = async () => {
      const response = await new HttpApi().downloadFile(
        prepareDynamicUrl(TASK_PREVIEW_PDF, row.id)
      );
      customFileDownloader({
        fileData: response.data,
        fileName: `task-${row.id}`,
        fileExtension: 'pdf',
      });
    };
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(TASK_VIEW, row.id),
        permission: READ_TASK,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(TASK_EDIT, row.id),
        permission: UPDATE_TASK,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        modalContent: (
          <DeleteModal
            title="Task"
            endpoint={`${TASK}/${row.id}`}
            refetchKey={TASK}
          />
        ),

        permission: DELETE_TASK,
        actionKey: DELETE_TASK,
      },
      {
        label: 'Preview',
        icon: 'bx bx-printer',
        actionMethod: handleDownloadPdf,

        permission: READ_TASK,
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
      dataField: 'task_id',
      text: 'Task ID',
    },
    {
      dataField: 'date',
      text: 'Date',

      formatter: (row: TaskResponse) => {
        return shortDateFormat(row.date);
      },
    },
    {
      dataField: 'created_by.name',
      text: 'Created By',
    },
    {
      dataField: 'assigned_to.name',
      text: 'Assigned To',
    },
    {
      dataField: 'status',
      text: 'Status',
      // eslint-disable-next-line react/no-unstable-nested-components
      formatter: (row: TaskResponse) => (
        <UpdateStatus
          endpoint={`${TASK}/${row.id}`}
          status={row.status}
          options={taskStatusOptions}
          colorOptions={taskStatusColorOptions}
        />
      ),
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

export default TaskTable;
