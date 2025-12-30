import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import ErrorMessage from '../../../components/ErrorMessage';
import Pagination from '../../../components/Pagination';
import CustomLoader from '../../../components/CustomLoader';
import { PUBLISHED_LAB_RESULT_LIST } from '../../../constants/path';
import useLabResultList from '../hooks/useLabResultList';
import CustomDataTable from '../../../components/CustomDataTable';
import { LabReport } from '../../../types/lab/labReport';
import { formattedShortDate } from '../../../helpers';
import { READ_LAB_REPORT } from '../../../constants/permissions';
import ViewLabReportAsPdf from '../ViewLabReportAsPdf';
import { CustomDropdownMenuItem } from '../../../types/common';
import ActionDropdown from '../../../components/ActionDropdown';
import useViewLabReportAsPdf from '../hooks/useViewLabReportAsPdf';
import { can } from '../../../helpers/checkPermission';
import Loader from '../../../components/Loader';

type FormatActionColumnProps = {
  id: number;
  refetch: any;
  readAt: string | null;
};

const FormatActionColumn: React.FC<FormatActionColumnProps> = ({
  id,
  refetch,
  readAt,
}) => {
  const { handleDownloadReport, loading } = useViewLabReportAsPdf(
    id,
    refetch,
    readAt
  );

  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: 'View',
      icon: 'bx bx-show',
      actionMethod: handleDownloadReport,
      permission: READ_LAB_REPORT,
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <ActionDropdown
        menuItems={menuItems}
        containerClass="d-flex align-items-center justify-content-between text-white"
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
      />
    </>
  );
};

const PublishedLabResultList: React.FC = () => {
  const canReadLabReport = can(READ_LAB_REPORT);

  const { data, isFetching, isError, refetch, pageNumber, handlePageChange } =
    useLabResultList();

  const actionColumnFormatter = (row: LabReport) => {
    return (
      <FormatActionColumn id={row.id} refetch={refetch} readAt={row.read_at} />
    );
  };

  const sampleIdColumnFormatter = (row: LabReport) => {
    return canReadLabReport ? (
      <ViewLabReportAsPdf
        labReportId={row.id}
        refetch={refetch}
        readAt={row.read_at}>
        <span className="p-0 font-14">
          {row?.lab_samples?.[0]?.sample_id ?? '-'}
          {!row.read_at && <span className="badge bg-info ms-2">New</span>}
        </span>
      </ViewLabReportAsPdf>
    ) : (
      (row?.lab_samples?.[0]?.sample_id ?? '-')
    );
  };

  const columns = [
    {
      dataField: 'sample_id',
      text: 'Sample Id',
      formatter: sampleIdColumnFormatter,
    },
    {
      dataField: 'paddock',
      text: 'Paddock',
      formatter: (row: LabReport) => row?.lab_samples?.[0]?.paddock ?? '-',
    },
    {
      dataField: 'updated_at',
      text: 'Published At',
      formatter: (row: LabReport) => formattedShortDate(row.updated_at),
    },
    {
      dataField: '',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Lab Results',
            path: PUBLISHED_LAB_RESULT_LIST,
            active: true,
          },
        ]}
        title="Lab Results"
      />

      <Card>
        <Card.Body>
          <CustomDataTable columns={columns} data={data!.body} />
          <Pagination
            data={data!.meta_data!.pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default PublishedLabResultList;
