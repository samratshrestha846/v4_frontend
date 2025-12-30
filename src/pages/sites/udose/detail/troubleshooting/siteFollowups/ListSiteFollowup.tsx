import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';

import useSiteFollowupData from './hooks/useSiteFollowupData';
import CustomDataTable from '../../../../../../components/CustomDataTable';
import { formattedShortDate } from '../../../../../../helpers';
import CustomLoader from '../../../../../../components/CustomLoader';
import Pagination from '../../../../../../components/Pagination';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import { SiteFollowup } from '../../../../../../types/udose/siteFollowup';
import {
  UDOSE_FOLLOWUP_STATUS_COMPLETED,
  UDOSE_FOLLOWUP_STATUS_TODO,
} from '../../../../../../constants/constants';
import AddFollowupServiceLog from './AddFollowupServiceLog';
import { can } from '../../../../../../helpers/checkPermission';
import {
  CREATE_SITE_FOLLOWUP,
  CREATE_SITE_SERVICE_LOG,
  UPDATE_SITE_FOLLOWUP,
} from '../../../../../../constants/permissions';
import TruncateTextWithOverlayTooltip from '../../../../../../components/TruncateTextWithOverlayTooltip';
import useModalFeature from '../../../../../../hooks/common/useModalFeature';
import AddNewRecordUsingModal from '../../../../../../components/AddNewRecordUsingModal';
import AddSiteFollowupModal from './modal/AddSiteFollowupModal';
import EditSiteFollowupButton from './EditSiteFollowupButton';

const ListSiteFollowup: React.FC = () => {
  const canCreateSiteServiceLog = can(CREATE_SITE_SERVICE_LOG);
  const canCreateSiteFollowup = can(CREATE_SITE_FOLLOWUP);
  const canUpdateSiteFollowup = can(UPDATE_SITE_FOLLOWUP);

  const { showModal, toggleModal } = useModalFeature();

  const {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    refetch: refetchSiteFollowups,
  } = useSiteFollowupData();

  const formatStatus = (row: SiteFollowup) => {
    if (!row.status) {
      return null;
    }
    return (
      <Badge
        className={`badge-outline-${row.status === UDOSE_FOLLOWUP_STATUS_COMPLETED ? 'success' : 'gray'}`}>
        {row.status === UDOSE_FOLLOWUP_STATUS_COMPLETED ? 'Completed' : 'To Do'}
      </Badge>
    );
  };

  const actionColumnFormatter = (row: SiteFollowup) => {
    return (
      <div className="button-list action-icon">
        {row.status === UDOSE_FOLLOWUP_STATUS_TODO && canUpdateSiteFollowup && (
          <EditSiteFollowupButton
            followipId={row.id}
            refetchSiteFollowups={refetchSiteFollowups}
          />
        )}

        {row.status === UDOSE_FOLLOWUP_STATUS_TODO &&
          canCreateSiteServiceLog && (
            <AddFollowupServiceLog
              refetchSiteFollowups={refetchSiteFollowups}
              followupId={row.id}
            />
          )}
      </div>
    );
  };

  const truncateLengthyText = (text: string) => {
    return text ? (
      <TruncateTextWithOverlayTooltip text={text} endIndex={20} />
    ) : (
      '-'
    );
  };

  const columns = [
    {
      text: 'Action Required',
      dataField: 'site_class',
    },
    {
      text: 'Task Note',
      dataField: 'general_note',
      formatter: (row: SiteFollowup) => truncateLengthyText(row.general_note),
    },
    {
      text: 'Scheduling Note',
      dataField: 'raingauze_note',
      formatter: (row: SiteFollowup) => truncateLengthyText(row.raingauze_note),
    },
    {
      text: 'Result',
      dataField: 'review_note',
      formatter: (row: SiteFollowup) => truncateLengthyText(row.review_note),
    },
    {
      text: 'Action Required By',
      dataField: 'last_fill_detected',
      formatter: (row: SiteFollowup) =>
        row.last_fill_detected
          ? formattedShortDate(row.last_fill_detected)
          : '-',
    },
    {
      text: 'Status',
      dataField: 'status',
      formatter: formatStatus,
    },

    {
      text: 'Action',
      dataField: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Row className="mt-3">
        <Col md={6} sm={6}>
          <h5 className="text-primary-color">Site Follow-ups</h5>
        </Col>
        {canCreateSiteFollowup && (
          <Col md={6} sm={6} className="mb-2">
            <AddNewRecordUsingModal
              title="Add Site Follow-up"
              toggleModal={toggleModal}
            />
          </Col>
        )}
      </Row>

      {isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <CustomDataTable columns={columns} data={data!.body} />
          <Pagination
            data={data?.meta_data?.pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        </>
      )}
      <AddSiteFollowupModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetchSiteFollowups={refetchSiteFollowups}
      />
    </>
  );
};

export default ListSiteFollowup;
