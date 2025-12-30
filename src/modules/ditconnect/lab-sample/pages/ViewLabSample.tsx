import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { formattedDatetime, prepareDynamicUrl } from '@uhub/helpers';
import { InfoColumn } from '../../components/InfoColumn';
import useReadLabSample from '../hooks/useReadLabSample';
import {
  LAB_SAMPLE_LIST,
  LAB_SAMPLE_STATUS_APPROVED,
  LAB_SAMPLE_TYPE_DUNG,
  LAB_SAMPLE_TYPE_PASTURE,
  LAB_SAMPLE_TYPE_WATER,
  LAB_SAMPLE_VIEW,
} from '../constants/constant';
import HandleImage from './HandleImage';

const ViewLabSample: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Lab Sample';

  const { data, isFetching, isError } = useReadLabSample(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: LAB_SAMPLE_LIST,
            active: false,
          },
          {
            label: data?.sample_id.toString() ?? `${title} Details`,
            path: prepareDynamicUrl(LAB_SAMPLE_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Card>
        <Card.Body>
          <Row>
            <InfoColumn
              label="Sample ID"
              value={data?.sample_id ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Sample Type"
              value={data?.sample_type ?? '-'}
              colSpan={3}
              smColSpan={6}
            />

            {data?.sample_type === LAB_SAMPLE_TYPE_PASTURE && (
              <InfoColumn
                label="Plant Specs"
                value={data?.plant_species ?? '-'}
                colSpan={3}
                smColSpan={6}
              />
            )}

            {data?.sample_type === LAB_SAMPLE_TYPE_DUNG && (
              <>
                <InfoColumn
                  label="Dung Freshness Score"
                  value={data?.dung_freshness_score ?? '-'}
                  colSpan={3}
                  smColSpan={6}
                />

                <InfoColumn
                  label="Faecal Score"
                  value={data?.faecal_score ?? '-'}
                  colSpan={3}
                  smColSpan={6}
                />
              </>
            )}

            {data?.sample_type === LAB_SAMPLE_TYPE_WATER && (
              <>
                <InfoColumn
                  label="Sample Taken From"
                  value={data?.sample_taken_from ?? '-'}
                  colSpan={3}
                  smColSpan={6}
                />

                <InfoColumn
                  label="PH Value"
                  value={data?.ph_value ?? '-'}
                  colSpan={3}
                  smColSpan={6}
                />
              </>
            )}

            <InfoColumn
              label="Collected At"
              value={
                data?.collected_at ? formattedDatetime(data.collected_at) : '-'
              }
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Received At"
              value={
                data?.received_datetime
                  ? formattedDatetime(data.received_datetime)
                  : '-'
              }
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Latitude, Longitude"
              value={
                data?.latitude && data?.longitude
                  ? `${data?.latitude}, ${data?.longitude}`
                  : '-'
              }
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Sample Taken By"
              value={data?.sample_taken_by?.name ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <Col sm={6} md={3}>
              <h6 className="font-14">Status</h6>
              <IconLabelStatus
                label={data?.status}
                iconTextClass={
                  data?.status === LAB_SAMPLE_STATUS_APPROVED
                    ? 'text-success'
                    : 'text-light-gray'
                }
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
              label="Is new tablespoon collection method used ?"
              value={data?.used_tablespoon_collection ? 'Yes' : 'No'}
              colSpan={3}
              smColSpan={6}
            />
          </Row>
          <h5 className="text-uppercase text-soft-gray mt-2">Site Details</h5>
          <Row>
            <InfoColumn
              label="Property"
              value={data?.customer_property ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Site"
              value={data?.site_name ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Other Site"
              value={data?.other_site ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Device Serial No."
              value={data?.device_serial_number ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
          </Row>
          <h5 className="text-uppercase text-soft-gray mt-2">
            Animal Specifications
          </h5>
          <Row>
            <InfoColumn
              label="Animal Specs"
              value={data?.animal_specs ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="Animal BCs"
              value={data?.animal_bcs ?? '-'}
              colSpan={3}
              smColSpan={6}
            />
            <InfoColumn
              label="No. of Cattle"
              value={data?.number_of_cattle ?? '-'}
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
      {data?.lab_sample_photos?.length > 0 && (
        <>
          <h4 className="text-primary-color">Related Photos</h4>
          <Card>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <HandleImage images={data?.lab_sample_photos ?? []} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default ViewLabSample;
