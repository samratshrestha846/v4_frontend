import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import CustomDataTable from '@uhub/components/CustomDataTable';
import { TableColumn } from '@uhub/types/common';
import {
  SUPPLEMENT_MIXING_LIST,
  SUPPLEMENT_MIXING_VIEW,
} from '../constants/constant';
import useReadSupplementMixing from '../hooks/useReadSupplementMixing';
import { InfoColumn } from '../../components/InfoColumn';
import { SUPPLEMENT_STATUS_PENDING } from '../../supplement-transfer/constants/constant';
import { SupplementMixingItemResponse } from '../types/SupplementMixing';

const ViewSupplementMixing: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Mixing';

  const { data, isFetching, isError } = useReadSupplementMixing(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  const mixingItemsTableColumns: TableColumn[] = [
    {
      dataField: 'batch_no',
      text: 'Batch Number',
      formatter: (row: SupplementMixingItemResponse) =>
        row?.batch_no ?? row?.supplement_manufacture?.batch_number ?? '-',
    },
    {
      dataField: 'supplement.name',
      text: 'Supplement',
    },
    {
      dataField: 'qty',
      text: 'Qantity',
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: SUPPLEMENT_MIXING_LIST,
            active: false,
          },
          {
            label: data?.updated_batch_no ?? title,
            path: prepareDynamicUrl(SUPPLEMENT_MIXING_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Card>
        <Card.Body>
          <Row>
            <InfoColumn
              label="Location"
              value={
                data?.stock_location
                  ? `${data.stock_location.name} ${data.stock_location.state}`
                  : '-'
              }
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Date"
              value={data?.date ? formattedShortDate(data.date) : '-'}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Created By"
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
          <div>
            <h5 className="text-uppercase text-soft-gray my-3">
              Consumed Products
            </h5>
            <CustomDataTable
              columns={mixingItemsTableColumns}
              data={data?.supplement_mixing_items ?? []}
              wrapperClassName="table-no-min-height"
            />
          </div>
          <div>
            <h5 className="text-uppercase text-soft-gray my-3">After Mixing</h5>
            <Row>
              <InfoColumn
                label="Updated Supplement"
                value={data?.updated_supplement?.name ?? '-'}
                colSpan={3}
                smColSpan={6}
              />
              <InfoColumn
                label="Updated Batch Number"
                value={data?.updated_batch_no ?? '-'}
                colSpan={3}
                smColSpan={6}
              />
              <InfoColumn
                label="Updated Quantity"
                value={data?.updated_qty ? String(data.updated_qty) : '-'}
                colSpan={3}
                smColSpan={6}
              />
              <InfoColumn
                label="Updated Quantity"
                value={data?.updated_qty ? String(data.updated_qty) : '-'}
                colSpan={3}
                smColSpan={6}
              />
            </Row>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewSupplementMixing;
