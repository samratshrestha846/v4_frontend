import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button, Col, Row } from 'react-bootstrap';

import { LOGS_LIST } from '../../../../../../constants/path';
import useFetchLogs from '../../../../../../hooks/common/useFetchLogs';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import CustomLoader from '../../../../../../components/CustomLoader';
import { Log } from '../../../../../../types/log/logList';
import { formattedDatetime } from '../../../../../../helpers';
import CustomDataTable from '../../../../../../components/CustomDataTable';
import CreateSiteNoteModal from '../siteNotes/modal/CreateSiteNoteModal';
import { SITE_NOTES_OPTIONS } from '../../../../../../constants/siteNotes';
import useModalFeature from '../../../../../../hooks/common/useModalFeature';
import { TableColumn } from '../../../../../../types/common';
import TruncateTextWithOverlayTooltip from '../../../../../../components/TruncateTextWithOverlayTooltip';

type Props = {
  siteId: number;
  noteType: string;
  setNoteType: Dispatch<SetStateAction<string>>;
};

const ListSiteNotes: React.FC<Props> = ({ siteId, noteType, setNoteType }) => {
  const { showModal, toggleModal } = useModalFeature();

  const { data, isFetching, isError, refetch } = useFetchLogs({
    model_type: 'site',
    model_id: String(siteId),
    type: 'note',
    page_size: 5,
  });

  const descriptionColumnformatter = (row: Log) => {
    return (
      <TruncateTextWithOverlayTooltip text={row.description} endIndex={50} />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'created_at',
      text: 'Created At',
      formatter: (row: Log) =>
        row.created_at && formattedDatetime(row.created_at),
    },
    {
      dataField: 'user.first_name',
      text: 'By',
      formatter: (row: Log) => row.user?.first_name ?? '-',
      format: true,
    },
    {
      dataField: 'description',
      text: 'Log Message',
      formatter: descriptionColumnformatter,
    },
  ];

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      {' '}
      <Row>
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
          <div className="float-end">
            <Button onClick={toggleModal}>
              <i className="bx bxs-add-to-queue me-1" />
              <span>Add Site Note</span>
            </Button>
          </div>
        </Col>
      </Row>
      {isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <CustomDataTable columns={columns} data={data!.body} />
          <Link
            className="bx bx-file btn-link float-end"
            to={`/${LOGS_LIST}?model_type=site&model_id=${siteId}&type=note`}>
            View more
          </Link>
        </>
      )}
      <CreateSiteNoteModal
        showModal={showModal}
        toggleModal={toggleModal}
        siteId={Number(siteId)}
        refetch={refetch}
      />
    </>
  );
};

export default ListSiteNotes;
