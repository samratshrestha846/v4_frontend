import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { Property } from '@uhub/types/property/propertyList';
import {
  SUPPLEMENT_SALE_LIST,
  SUPPLEMENT_SALE_VIEW,
} from '../constants/constant';
import { InfoColumn } from '../../components/InfoColumn';
import { SUPPLEMENT_STATUS_PENDING } from '../../supplement-transfer/constants/constant';

import useReadSupplementSale from '../hooks/useReadSupplementSale';
import { SupplementSaleResponse } from '../types/SupplementSale';

const ViewSupplementSale: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Sales PAYG';

  const { data, isFetching, isError } = useReadSupplementSale(id);

  const propertyFormatter = (row: SupplementSaleResponse) => {
    return row.property_snapshot
      ? (JSON.parse(row?.property_snapshot) as Property)?.name
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
            path: SUPPLEMENT_SALE_LIST,
            active: false,
          },
          {
            label: data?.batch_no ?? `${title} Details`,
            path: prepareDynamicUrl(SUPPLEMENT_SALE_VIEW, id),
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
              label="Location"
              value={
                data?.location
                  ? `${data.location.name} ${data.location.state}`
                  : '-'
              }
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Property"
              value={propertyFormatter(data)}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Customer"
              value={data?.customer ? data.customer.business_name : '-'}
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
            <Col md={12}>
              <h6 className="font-14">Notes</h6>
              <div>{data?.notes ? parse(data.notes) : '-'}</div>
            </Col>
          </Row>

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
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Invoice No."
              value={data?.invoice_no?.toString().split(',').join(', ') ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewSupplementSale;
