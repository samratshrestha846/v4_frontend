import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import { can } from '@uhub/helpers/checkPermission';
import { InfoColumn } from '../../components/InfoColumn';
import {
  PURCHASE_REQUEST_LIST,
  PURCHASE_REQUEST_STATUS_PAID,
  PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED,
  PURCHASE_REQUEST_VIEW,
} from '../constants/constant';
import useReadPurchaseRequest from '../hooks/useReadPurchaseRequest';
import ListPurchaseRequestItemsTable from './ListPurchaseRequestItemsTable';
import HandlePurchaseRequestDocument from './HandlePurchaseRequestDocument';
import ListComment from '../../comment/pages/ListComment';

import { ACCESS_COMMENT } from '../../comment/constants/constant';

const ViewPurchaseRequest: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Purchase Request';

  const canAccessComments = can(ACCESS_COMMENT);

  const { data, isFetching, isError } = useReadPurchaseRequest(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: PURCHASE_REQUEST_LIST,
            active: false,
          },
          {
            label: data?.pr_no ?? `${title} Details`,
            path: prepareDynamicUrl(PURCHASE_REQUEST_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Row>
        <Col sm={6} md={7}>
          <Card>
            <Card.Body>
              <Row>
                <InfoColumn
                  label="Purchase Request ID"
                  value={data?.pr_no ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />
                <InfoColumn
                  label="Title"
                  value={data?.title ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Requested By"
                  value={data?.requested_by_user?.name ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Requested To"
                  value={data?.requested_to_user?.name ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Required By"
                  value={
                    data?.required_by_date
                      ? formattedShortDate(data.required_by_date)
                      : '-'
                  }
                  colSpan={4}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Priority"
                  value={data?.priority ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Delivery Location"
                  value={data?.delivery_location ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Delivery Method"
                  value={data?.delivery_method ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Online Order URL"
                  value={data?.online_order_url ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Estimated Payment Date"
                  value={
                    data?.estimated_payment_date
                      ? formattedShortDate(data.estimated_payment_date)
                      : '-'
                  }
                  colSpan={4}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Total Price"
                  value={
                    data?.estimated_payment_date ? `$${data.total_price}` : '-'
                  }
                  colSpan={4}
                  smColSpan={6}
                />

                <Col sm={6} md={3}>
                  <h6 className="font-14">Status</h6>
                  <IconLabelStatus
                    label={data?.status}
                    iconTextClass={
                      data?.status === PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED
                        ? 'text-success'
                        : 'text-light-gray'
                    }
                  />
                </Col>

                {[
                  PURCHASE_REQUEST_STATUS_PAID,
                  PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED,
                ].includes(data?.status) && (
                  <>
                    <InfoColumn
                      label="Payment Method"
                      value={data?.payment?.paid_by ?? '-'}
                      colSpan={4}
                      smColSpan={6}
                    />
                    <InfoColumn
                      label="Purchase Order No."
                      value={data?.payment?.po_number ?? '-'}
                      colSpan={4}
                      smColSpan={6}
                    />
                  </>
                )}
              </Row>
              <h5 className="text-uppercase text-soft-gray">
                Supplier Details
              </h5>
              <Row>
                <InfoColumn
                  label="Supplier"
                  value={data?.supplier?.name ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />
                <InfoColumn
                  label="Location"
                  value={data?.supplier.location ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />
                <InfoColumn
                  label="Phone"
                  value={data?.supplier.phone ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />
                <InfoColumn
                  label="Website"
                  url={data?.supplier.website ?? '-'}
                  colSpan={4}
                  smColSpan={6}
                />
              </Row>
              <Row>
                <InfoColumn
                  label="Remarks"
                  value={data?.remarks ?? '-'}
                  colSpan={12}
                  type="html"
                />
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={5}>
          {data?.id && canAccessComments && (
            <ListComment commentableId={data.id} />
          )}
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <ListPurchaseRequestItemsTable
                items={data.items ?? []}
                totalPrice={data?.total_price ?? 0}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6}>
          <Card>
            <Card.Body>
              <HandlePurchaseRequestDocument
                title="Quotations"
                documents={data?.quotations ?? []}
                titleClass="text-primary-color mt-0"
                wrapperClass=""
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6}>
          <Card>
            <Card.Body>
              <HandlePurchaseRequestDocument
                title="Invoices"
                documents={data?.invoices ?? []}
                titleClass="text-primary-color mt-0"
                wrapperClass=""
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6}>
          <Card>
            <Card.Body>
              <HandlePurchaseRequestDocument
                title="Contracts"
                documents={data?.contracts ?? []}
                titleClass="text-primary-color mt-0"
                wrapperClass=""
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewPurchaseRequest;
