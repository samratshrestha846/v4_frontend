import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import {
  formattedDatetime,
  formattedShortDate,
  prepareDynamicUrl,
} from '@uhub/helpers';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import {
  STOCKTAKE_LIST,
  STOCKTAKE_STATUS_PENDING,
  STOCKTAKE_VIEW,
} from '../constants/constant';
import { InfoColumn } from '../../components/InfoColumn';
import useReadStocktake from '../hooks/useReadStocktake';
import StocktakeItemTable from './StocktakeItemTable';

const ViewStocktake: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Stocktake';

  const { data, isFetching, isError } = useReadStocktake(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title} List`, path: STOCKTAKE_LIST, active: false },
          {
            label: data?.date ?? title,
            path: prepareDynamicUrl(STOCKTAKE_VIEW, id),
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
              label="Created By"
              value={data?.created_by?.name ?? '-'}
              colSpan={3}
              smColSpan={6}
            />

            <Col sm={6} md={3}>
              <h6 className="font-14">Status</h6>
              <IconLabelStatus
                label={data?.status}
                iconTextClass={
                  data?.status === STOCKTAKE_STATUS_PENDING
                    ? 'text-light-gray'
                    : 'text-success'
                }
                wrapperClass="mb-2"
              />
            </Col>
            <InfoColumn
              label="Approved By"
              value={data?.approved_by?.name ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Approved At"
              value={
                data?.approved_at ? formattedDatetime(data.approved_at) : '-'
              }
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Notes"
              value={data?.notes ?? '-'}
              colSpan={12}
              type="html"
            />
          </Row>
        </Card.Body>
      </Card>
      {data && (
        <StocktakeItemTable
          title="Stocktake Items"
          data={[
            ...data.available_stocktake_items,
            ...data.not_found_stocktake_items,
          ]}
        />
      )}
    </>
  );
};

export default ViewStocktake;
