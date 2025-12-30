import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';

import { LOGS_LIST } from '../../../../../../constants/path';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import CustomLoader from '../../../../../../components/CustomLoader';
import { Log } from '../../../../../../types/log/logList';
import { formattedDatetime } from '../../../../../../helpers';
import CustomDataTable from '../../../../../../components/CustomDataTable';
import useFetchLogList from '../../../../../logs/hooks/useFetchLogList';
import { SITE } from '../../../../../../constants/constants';
import { SITE_NOTES_OPTIONS } from '../../../../../../constants/siteNotes';
import { TableColumn } from '../../../../../../types/common';
import TruncateTextWithOverlayTooltip from '../../../../../../components/TruncateTextWithOverlayTooltip';

type Props = {
  siteId: number;
  noteType: string;
  setNoteType: Dispatch<SetStateAction<string>>;
};

const ListSiteLogs: React.FC<Props> = ({ siteId, noteType, setNoteType }) => {
  const { data, isFetching, isError, setModelId, setModelType, setPageSize } =
    useFetchLogList();

  useEffect(() => {
    setModelType(SITE);
    setModelId(String(siteId));
    setPageSize(5);
  }, [siteId]);

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
      </Row>

      {isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <CustomDataTable columns={columns} data={data!.body} />
          <Link
            className="bx bx-file btn-link float-end"
            to={`/${LOGS_LIST}?model_type=site&model_id=${siteId}`}>
            View more
          </Link>
        </>
      )}
    </>
  );
};

export default ListSiteLogs;
