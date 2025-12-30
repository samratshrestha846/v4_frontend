import React, { useState } from 'react';
import { Log } from '../../types/log/logList';
import { tabularDate } from '../../helpers';
import CustomDataTable from '../../components/CustomDataTable';
import { TableColumn } from '../../types/common';
import TruncateTextWithOverlayTooltip from '../../components/TruncateTextWithOverlayTooltip';
import LogDetailModal from './modal/LogDetailModal';

type Props = {
  data: Log[];
};

const LogsTable: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeDetailValue, setActiveDetailValue] = useState<Log>();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const logColumnFormatter = (row: Log) => {
    return row.message ? (
      <div className="d-flex justify-content-start align-items-center gap-1">
        {row.message}
        {row.type !== 'satellite_communication' && (
          <button
            type="button"
            className="btn btn-link m-0 p-0"
            onClick={() => {
              setShowModal(true);
              setActiveDetailValue(row);
            }}>
            <i className="bx bx-right-arrow-circle text-info fs-4" />
          </button>
        )}
      </div>
    ) : (
      <TruncateTextWithOverlayTooltip text={row.description} endIndex={60} />
    );
  };

  const columns: TableColumn[] = [
    {
      text: 'Date',
      dataField: 'created_at',
      formatter: (row: Log) =>
        row.created_at ? tabularDate(row.created_at) : '-',
    },
    {
      text: 'Model Type',
      dataField: 'model_type',
    },
    {
      text: 'Model (Name/Serial Number)',
      dataField: 'created_at',
      formatter: (row: Log) =>
        row.created_at ? tabularDate(row.created_at) : '-',
    },
    {
      text: 'Log',
      dataField: 'created_at',
      formatter: logColumnFormatter,
    },
  ];

  return (
    <>
      <CustomDataTable columns={columns} data={data} />
      {showModal && (
        <LogDetailModal
          showModal={showModal}
          toggleModal={toggleModal}
          value={activeDetailValue}
        />
      )}
    </>
  );
};

export default LogsTable;
