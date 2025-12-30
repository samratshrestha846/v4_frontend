import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import { PRODUCTION_LIST, PRODUCTION_VIEW } from '../constants/constant';
import { InfoColumn } from '../../components/InfoColumn';
import useReadProduction from '../hooks/useReadProduction';

const ViewProduction: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Production';

  const { data, isFetching, isError } = useReadProduction(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: PRODUCTION_LIST,
            active: false,
          },
          {
            label: data?.batch_number ?? `${title} Details`,
            path: prepareDynamicUrl(PRODUCTION_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Card>
        <Card.Body>
          <Row>
            <InfoColumn
              label="Batch Number"
              value={data?.batch_number ?? '-'}
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
              label="Date"
              value={data?.date ? formattedShortDate(data.date) : '-'}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Created By"
              value={data?.created_by?.name}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Production Order No."
              value={data?.production_order_no}
              colSpan={3}
              smColSpan={6}
            />

            <InfoColumn
              label="Has jug test been completed?"
              value={data?.is_jug_tested ? 'Yes' : 'No'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Is created after mixing?"
              value={data?.is_created_after_mixing ? 'Yes' : 'No'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Is created after stocktake?"
              value={data?.is_created_after_stocktake ? 'Yes' : 'No'}
              colSpan={3}
              smColSpan={6}
            />
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

export default ViewProduction;
