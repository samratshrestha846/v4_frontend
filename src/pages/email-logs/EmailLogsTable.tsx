/* eslint-disable no-unused-vars */
import React from 'react';
import CustomDataTable from '../../components/CustomDataTable';
import Pagination from '../../components/Pagination';
import { EmailLog } from '../../types/email-logs/emailLogs';
import {
  capitalizeFirstLetter,
  formattedShortDate,
  formattedTime,
} from '../../helpers';
import TruncateTextWithOverlayTooltip from '../../components/TruncateTextWithOverlayTooltip';

type Props = {
  data: any;
  pageNumber: number;
  handlePageChange: (e: any) => void;
};

const EmailLogsTable: React.FC<Props> = ({
  data,
  pageNumber,
  handlePageChange,
}) => {
  const sentAtColumnFormatter = (row: EmailLog) => {
    return row.sent_at ? (
      <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
        <span className="text-nowrap">{formattedShortDate(row.sent_at)},</span>
        <span className="text-nowrap">{formattedTime(row.sent_at)}</span>
      </div>
    ) : (
      '-'
    );
  };

  const errorMessageColumnFormatter = (row: EmailLog) => {
    return row.error_message ? (
      <TruncateTextWithOverlayTooltip text={row.error_message} endIndex={30} />
    ) : (
      '-'
    );
  };

  const subjectColumnFormatter = (row: EmailLog) => {
    return row.subject ? (
      <TruncateTextWithOverlayTooltip text={row.subject} endIndex={30} />
    ) : (
      '-'
    );
  };

  const recipientColumnFormatter = (row: EmailLog) => {
    return row.recipient ? (
      <TruncateTextWithOverlayTooltip text={row.recipient} endIndex={30} />
    ) : (
      '-'
    );
  };

  const columns = [
    {
      text: 'Recipent',
      dataField: 'recipient',
      fromatter: recipientColumnFormatter,
    },
    {
      text: 'Subject',
      dataField: 'subject',
      formatter: subjectColumnFormatter,
    },

    {
      text: 'Sent at',
      dataField: 'sent_at',
      formatter: sentAtColumnFormatter,
    },
    {
      text: 'Status',
      dataField: 'status',
      formatter: (row: EmailLog) =>
        row.status ? capitalizeFirstLetter(row.status) : '-',
    },

    {
      text: 'Message',
      dataField: 'error_message',
      formatter: errorMessageColumnFormatter,
    },
  ];

  return (
    <>
      <CustomDataTable columns={columns} data={data!.body} />
      <Pagination
        data={data?.meta_data?.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default EmailLogsTable;
