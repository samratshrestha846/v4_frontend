import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import {
  SUPPLEMENT_STATUS_PENDING,
  SUPPLEMENT_TRANSFER_LIST,
  SUPPLEMENT_TRANSFER_VIEW,
} from '../constants/constant';
import useReadSupplementTransfer from '../hooks/useReadSupplementTransfer';

const ViewSupplementTransfer: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Transfer';

  const { data, isFetching, isError } = useReadSupplementTransfer(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: SUPPLEMENT_TRANSFER_LIST,
            active: false,
          },
          {
            label: data?.supplement_manufacture?.batch_number ?? title,
            path: prepareDynamicUrl(SUPPLEMENT_TRANSFER_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Card>
        <Card.Body>
          <Row>
            <Col sm={6} md={3}>
              <h6 className="font-14">Batch Number </h6>
              <p>
                {data?.batch_no ??
                  data?.supplement_manufacture?.batch_number ??
                  '-'}
              </p>
            </Col>
            <Col sm={6} md={3}>
              <h6 className="font-14">Location</h6>
              <p>{data?.supplement?.name ?? '-'}</p>
            </Col>
            <Col sm={6} md={3}>
              <h6 className="font-14">Quantity</h6>
              <p>{data?.qty ? `${data.qty}` : '-'}</p>
            </Col>
            <Col sm={6} md={3}>
              <h6 className="font-14">From Location</h6>
              <p>
                {data?.stock_location
                  ? `${data.stock_location.name} ${data.stock_location.state}`
                  : '-'}
              </p>
            </Col>
            <Col sm={6} md={3}>
              <h6 className="font-14">To Location</h6>
              <p>
                {data?.to_location
                  ? `${data.to_location.name} ${data.to_location.state}`
                  : '-'}
              </p>
            </Col>

            <Col sm={6} md={3}>
              <h6 className="font-14">Date</h6>
              <p>{data?.date ? formattedShortDate(data.date) : '-'}</p>
            </Col>

            <Col sm={6} md={3}>
              <h6 className="font-14">Storage Tank</h6>
              <p>{data?.storage_tank?.name ?? '-'}</p>
            </Col>
            <Col sm={6} md={3}>
              <h6 className="font-14">Created By</h6>
              <p>{data?.created_by?.name ?? '-'}</p>
            </Col>
            <Col sm={6} md={3}>
              <h6 className="font-14">Updated By</h6>
              <p>{data?.updated_by?.name ?? '-'}</p>
            </Col>
            <Col sm={6} md={3}>
              <h6 className="font-14">Status</h6>
              <IconLabelStatus
                label={data?.status}
                iconTextClass={
                  data?.status === SUPPLEMENT_STATUS_PENDING
                    ? 'text-light-gray'
                    : 'text-success'
                }
              />
            </Col>
            <Col sm={6} md={3}>
              <h6 className="font-14">Completed By</h6>
              <p>{data?.completed_by?.name ?? '-'}</p>
            </Col>
            <Col sm={6} md={3}>
              <h6 className="font-14">Completed At</h6>
              <p>
                {data?.completed_at
                  ? formattedShortDate(data.completed_at)
                  : '-'}
              </p>
            </Col>
            <Col md={12}>
              <h6 className="font-14">Notes</h6>
              <div>{data?.notes ? parse(data.notes) : '-'}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewSupplementTransfer;
