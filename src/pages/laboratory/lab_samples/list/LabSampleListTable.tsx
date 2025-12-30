import React from 'react';
import CustomLoader from '../../../../components/CustomLoader';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';
import { prepareDynamicUrl, shortDateFormat } from '../../../../helpers';
import {
  CREATE_LAB_TEST_RESULT,
  READ_LAB_SAMPLE,
  UPDATE_LAB_SAMPLE,
} from '../../../../constants/permissions';
import {
  LabSample,
  LabSampleListResponse,
} from '../../../../types/lab/labSampleList';
import Loader from '../../../../components/Loader';
import {
  LAB_SAMPLE_EDIT,
  LAB_SAMPLE_VIEW,
  LAB_TEST_RESULT_ADD,
} from '../../../../constants/path';
import { CustomDropdownMenuItem } from '../../../../types/common';
import ActionDropdown from '../../../../components/ActionDropdown';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  data?: LabSampleListResponse;
  // eslint-disable-next-line no-unused-vars
  handlePageChange: (e: any) => void;
  isFetchingReport: boolean;
};

const LabSampleListTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  data,
  handlePageChange,
  isFetchingReport,
}) => {
  const actionColumnFormatter = (row: LabSample) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(LAB_SAMPLE_VIEW, row.id),
        permission: READ_LAB_SAMPLE,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(LAB_SAMPLE_EDIT, row.id),
        permission: UPDATE_LAB_SAMPLE,
      },
      {
        label: 'Add Test Result',
        icon: 'bx bx-book-add',
        url: prepareDynamicUrl(LAB_TEST_RESULT_ADD, row.id),
        permission: CREATE_LAB_TEST_RESULT,
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

  const columns = [
    {
      dataField: 'sample_id',
      text: 'Sample ID',
    },
    {
      dataField: 'lab_sample_type.name',
      text: 'Sample Type',
    },
    {
      dataField: 'site.name',
      text: 'Site',
    },
    {
      dataField: 'collected_datetime',
      text: 'Collected At',
      formatter: (cell: any, row: any) => {
        return shortDateFormat(row.collected_datetime);
      },
    },
    {
      dataField: 'sample_taken_by.id',
      text: 'Sample Taken By',
      formatter: (cell: any, row: any) => {
        return `${row.sample_taken_by.first_name} ${row.sample_taken_by.last_name}`;
      },
    },
    {
      dataField: '',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isFetchingReport) return <Loader />;

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

export default LabSampleListTable;
