/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '../../../../components/CustomLoader';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';
import {
  LabReport,
  LabReportListResponse,
} from '../../../../types/lab/labReport';
import { formattedShortDate, prepareDynamicUrl } from '../../../../helpers';
import {
  READ_LAB_REPORT,
  UPDATE_LAB_REPORT,
} from '../../../../constants/permissions';
import { LAB_REPORT_EDIT } from '../../../../constants/path';
import PublishLabReport from '../PublishLabReport';
import ActionDropdown from '../../../../components/ActionDropdown';
import useDownloadLabReport from '../hooks/useDownloadLabReport';
import { CustomDropdownMenuItem, TableColumn } from '../../../../types/common';
import Loader from '../../../../components/Loader';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  refetch?: () => void;
  data?: LabReportListResponse;
  handlePageChange: (e: any) => void;
};

const FormatActionColumn: React.FC<{ id: number }> = ({ id }) => {
  const { handleDownloadReport, loading } = useDownloadLabReport(id);

  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: 'View',
      icon: 'bx bx-show',
      actionMethod: handleDownloadReport,
      permission: READ_LAB_REPORT,
    },

    {
      label: 'Edit',
      icon: 'bx bx-edit',
      url: prepareDynamicUrl(LAB_REPORT_EDIT, id),
      permission: UPDATE_LAB_REPORT,
    },
  ];
  return (
    <>
      {loading && <Loader />}
      <ActionDropdown
        menuItems={menuItems}
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
      />
    </>
  );
};

const LabReportListTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  refetch,
  data,
  handlePageChange,
}) => {
  const actionColumnFormatter = (row: LabReport) => {
    return <FormatActionColumn id={row.id} />;
  };

  const statusColumnFormatter = (row: LabReport) => {
    return (
      <PublishLabReport
        labReportId={row.id}
        labReportStatus={row.status}
        refetch={refetch}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'lab.sample_type.name',
      text: 'Sample Type',
      formatter: (row: LabReport) =>
        row?.lab_samples?.[0]?.lab_sample_type?.name ?? '-',
    },
    {
      dataField: 'site.name',
      text: 'Site',
      formatter: (row: LabReport) => row?.lab_samples?.[0]?.site?.name ?? '-',
    },
    {
      dataField: 'paddock',
      text: 'Paddock',
      formatter: (row: LabReport) => row?.lab_samples?.[0]?.paddock ?? '-',
    },
    {
      dataField: 'report_date',
      text: 'Date',
      formatter: (row: LabReport) => formattedShortDate(row.report_date),
    },
    {
      dataField: 'analysed_by.name',
      text: 'Analysed By',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusColumnFormatter,
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

export default LabReportListTable;
