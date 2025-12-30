import React, { Dispatch, SetStateAction } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

import { formattedDatetime } from '../../../../../../../helpers';
import { SITE_NOTES_OPTIONS } from '../../../../../../../constants/siteNotes';
import { UdoseStopReason } from '../../../../../../../types/udose/udoseStopReason';
import { TableColumn } from '../../../../../../../types/common';

import useListUdoseStopReason from '../hooks/useListUdoseStopReason';
import useExportUdoseStopReasonList from '../hooks/useExportUdoseStopReasonList';
import useModalFeature from '../../../../../../../hooks/common/useModalFeature';

import ManualStopReasonModal from './modal/ManualStopReasonModal';
import ErrorMessage from '../../../../../../../components/ErrorMessage';
import CustomLoader from '../../../../../../../components/CustomLoader';
import CustomDataTable from '../../../../../../../components/CustomDataTable';
import Pagination from '../../../../../../../components/Pagination';
import TruncateTextWithOverlayTooltip from '../../../../../../../components/TruncateTextWithOverlayTooltip';
import Loader from '../../../../../../../components/Loader';

type Props = {
  siteId: number;
  noteType: string;
  setNoteType: Dispatch<SetStateAction<string>>;
};

const ListUdoseStopReasons: React.FC<Props> = ({
  siteId,
  noteType,
  setNoteType,
}) => {
  const { id } = useParams();

  const {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    sort,
    direction,
    handleTabeDataSorting,
    refetch,
  } = useListUdoseStopReason(Number(id));

  const { handleExportList, isExportingList } = useExportUdoseStopReasonList(
    Number(id)
  );

  const { showModal, toggleModal } = useModalFeature();

  const noteColumnformatter = (row: UdoseStopReason) => {
    return <TruncateTextWithOverlayTooltip text={row.notes} endIndex={40} />;
  };

  const columns: TableColumn[] = [
    {
      dataField: 'created_at',
      text: 'Created At',
      sortable: true,
      formatter: (row: UdoseStopReason) =>
        row.created_at && formattedDatetime(row.created_at),
    },
    {
      dataField: 'performed_by.first_name',
      text: 'By',
      formatter: (row: UdoseStopReason) =>
        row.performed_by
          ? `${row.performed_by.first_name} ${row.performed_by.last_name}`
          : '-',
    },
    {
      dataField: 'reason',
      text: 'Reason Type',
    },

    {
      dataField: 'notes',
      text: 'Notes',
      formatter: noteColumnformatter,
    },
  ];

  if (isExportingList) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Row className="col-reverse">
        <Col md={3} sm={3} className="mb-2">
          <Select
            options={SITE_NOTES_OPTIONS}
            placeholder="Note Type"
            onChange={(e) => setNoteType(e ? e.value : '')}
            value={SITE_NOTES_OPTIONS?.find(
              (item: any) => item.value === noteType
            )}
          />
        </Col>

        <Col md={9} sm={9} className="mb-2">
          <div className="d-flex gap-1 justify-content-end flex-wrap">
            <Button
              variant="secondary"
              onClick={toggleModal}
              className="mb-1 btn btn-secondary btn-sm float-end">
              <i className="bx bxs-add-to-queue me-1" />
              <span>Add Doser Stop Reason</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleExportList}
              className="mb-1 btn btn-sm btn-outline-secondary m-0">
              <i className="bx bxs-file-export" />
              <span>Export</span>
            </Button>
          </div>
        </Col>
      </Row>

      {isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <CustomDataTable
            columns={columns}
            data={data!.body}
            sort={sort}
            direction={direction}
            handleTabeDataSorting={handleTabeDataSorting}
          />

          <Pagination
            data={data?.meta_data?.pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
          <ManualStopReasonModal
            showModal={showModal}
            toggleModal={toggleModal}
            siteId={Number(siteId)}
            refetch={refetch}
          />
        </>
      )}
    </>
  );
};

export default ListUdoseStopReasons;
