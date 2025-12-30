import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import PageTitle from '@uhub/components/PageTitle';
import { Link, useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { Site } from '@uhub/types/site';
import Image from '@uhub/components/Image';
import {
  SUPPLEMENT_REFILL_LIST,
  SUPPLEMENT_REFILL_VIEW,
} from '../constants/constant';
import { InfoColumn } from '../../components/InfoColumn';
import { SUPPLEMENT_STATUS_PENDING } from '../../supplement-transfer/constants/constant';
import useReadSupplementRefill from '../hooks/useReadSupplementRefill';

import { SupplementRefillResponse } from '../types/SupplementRefill';

const ViewSupplementRefill: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Delivery';

  const { data, isFetching, isError } = useReadSupplementRefill(id);

  const toLocationcolumnFormatter = (row: SupplementRefillResponse) => {
    if (row.to_location) return row.to_location;
    return row.site_snapshot
      ? (JSON.parse(row?.site_snapshot) as Site)?.name
      : '-';
  };

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: SUPPLEMENT_REFILL_LIST,
            active: false,
          },
          {
            label:
              data?.batch_no ??
              data?.supplement_manufacture?.batch_number ??
              `${title} Details`,
            path: prepareDynamicUrl(SUPPLEMENT_REFILL_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Card>
        <Card.Body>
          <Row>
            <InfoColumn
              label="Date"
              value={data?.date ? formattedShortDate(data.date) : '-'}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Batch Number"
              value={
                data?.batch_no ??
                data?.supplement_manufacture?.batch_number ??
                '-'
              }
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Supplement"
              value={data?.supplement?.name ?? '-'}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Quantity"
              value={data?.qty ? String(data.qty) : '-'}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Stock Location"
              value={
                data?.stock_location
                  ? `${data.stock_location.name} ${data.stock_location.state}`
                  : '-'
              }
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Delivered Location"
              value={toLocationcolumnFormatter(data)}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Storage Tank"
              value={data?.storage_tank?.name ?? '-'}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Created by"
              value={data?.created_by?.name ?? '-'}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Updated By"
              value={data?.updated_by?.name ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Updated At"
              value={
                data?.updated_at ? formattedShortDate(data.updated_at) : '-'
              }
              colSpan={3}
              smColSpan={6}
            />
            <Col sm={6} md={3}>
              <h6 className="font-14">Status</h6>
              <IconLabelStatus
                label={data?.status}
                iconTextClass={
                  data?.status === SUPPLEMENT_STATUS_PENDING
                    ? 'text-light-gray'
                    : 'text-success'
                }
                wrapperClass="mb-2"
              />
            </Col>

            <InfoColumn
              label="Completed By"
              value={data?.completed_by?.name ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Completed At"
              value={
                data?.completed_at ? formattedShortDate(data.completed_at) : '-'
              }
              colSpan={3}
              smColSpan={6}
            />
          </Row>

          <div>
            <h5 className="text-uppercase text-soft-gray">
              Sales Order Confirmation
            </h5>
            <Row>
              <InfoColumn
                label="Sales Order Confirmation Id"
                value={
                  data?.sales_order_confirmation
                    ? String(
                        data?.sales_order_confirmation
                          ?.sales_order_confirmation_id
                      )
                    : '-'
                }
                colSpan={6}
                smColSpan={6}
              />
              <InfoColumn
                label="Invoice No."
                value={data?.invoice_no ?? '-'}
                colSpan={6}
                smColSpan={6}
              />
            </Row>
          </div>

          <div>
            <h5 className="text-uppercase text-soft-gray">Notes</h5>
            <Row>
              <Col md={6}>
                <h6 className="font-14">Admin Notes</h6>
                <div>{data?.admin_notes ? parse(data.admin_notes) : '-'}</div>
              </Col>
              <Col md={6}>
                <h6 className="font-14">Customer Notes</h6>
                <div>
                  {data?.customer_notes ? parse(data.customer_notes) : '-'}
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>

      {data?.attachments?.length > 0 && (
        <>
          <h4 className="text-primary-color">Attachments</h4>
          <Card>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <div className="d-flex align-items-center gap-2 py-2">
                    {data?.attachments?.map((item) => (
                      <Link to={item.file_url} target="_blank">
                        <Image
                          src={item.file_url}
                          alt="Attachment"
                          className="rounded-2 img-cover"
                          width={150}
                          height={150}
                        />
                      </Link>
                    ))}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default ViewSupplementRefill;
