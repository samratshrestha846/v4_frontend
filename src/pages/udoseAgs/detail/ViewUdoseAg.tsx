import React from 'react';
import { Card, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import CustomLoader from '../../../components/CustomLoader';
import UdoseAgInfo from '../components/UdoseAgInfo';
import useReadUdoseAg from '../hooks/useReadUdoseAg';
import ErrorMessage from '../../../components/ErrorMessage';
import { prepareDynamicUrl } from '../../../helpers';
import UdoseAgName from '../components/UdoseAgName';
import {
  UDOSE_AG_DAILY_MESSAGE_LIST,
  UDOSE_AG_LIST,
  UDOSE_AG_VIEW,
} from '../../../constants/path';
import { can } from '../../../helpers/checkPermission';
import {
  ACCESS_UDOSE_AG_MESSAGE,
  ACCESS_UDOSE_AG_SESSION,
} from '../../../constants/permissions';
import SessionRunsTable from '../../udoseAgSessions/SessionRunsTable';

const ViewUdoseAg: React.FC = () => {
  const canAccessUdoseAgSession = can(ACCESS_UDOSE_AG_SESSION);
  const canAccessUdoseAgDailyMessage = can(ACCESS_UDOSE_AG_MESSAGE);

  const { data: udoseAgDetail, isFetching, isError } = useReadUdoseAg();

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'uDose Ags', path: UDOSE_AG_LIST },
          {
            label: `${udoseAgDetail?.name ?? 'Udose Ag Detail'}`,
            path: prepareDynamicUrl(UDOSE_AG_VIEW, udoseAgDetail?.id),
            active: true,
          },
        ]}
        title="uDose Ag Detail"
      />

      <Card className="mb-1">
        <Card.Header>
          <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <UdoseAgName
                  siteId={udoseAgDetail!.id}
                  siteName={udoseAgDetail!.name}
                  siteNumber={udoseAgDetail!.serial_number}
                />
                {canAccessUdoseAgDailyMessage && (
                  <Link
                    to={prepareDynamicUrl(
                      UDOSE_AG_DAILY_MESSAGE_LIST,
                      udoseAgDetail!.id
                    )}
                    className="action-icon">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="message"> Daily Messages </Tooltip>
                      }>
                      <i className="bx bx-message-detail text-secondary pt-0" />
                    </OverlayTrigger>
                  </Link>
                )}
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <UdoseAgInfo udoseAgDetail={udoseAgDetail} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {canAccessUdoseAgSession && <SessionRunsTable />}
    </>
  );
};

export default ViewUdoseAg;
