import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import moment from 'moment';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';

import { TRAVEL_DIARY_VIEW } from '../constants/constant';
import useReadTravelDiary from '../hooks/useReadTravelDiary';
import { WORK_DIARY_LIST } from '../../work-diary/constants/constant';
import { FLEET_VEHICLE_TYPE_OPTIONS_PLANE } from '../../../fleet-vehicle/constants/constant';

const ViewTravelDiary: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Travel Diary';
  const { data, isFetching, isError } = useReadTravelDiary(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: WORK_DIARY_LIST, active: false },
          {
            label: data?.date
              ? formattedShortDate(data.date)
              : `${title} Detail`,
            path: prepareDynamicUrl(TRAVEL_DIARY_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Detail`}
      />
      <Card>
        <Card.Body>
          {data && (
            <>
              <Row>
                <Col sm={6} md={3}>
                  <h6 className="font-14">User Name</h6>
                  <p>
                    {data?.user
                      ? `${data.user.first_name} ${data.user.last_name}`
                      : '-'}
                  </p>
                </Col>
                <Col sm={6} md={3}>
                  <h6 className="font-14">Date</h6>
                  <p>{data?.date ? formattedShortDate(data.date) : '-'}</p>
                </Col>
                <Col sm={6} md={3}>
                  <h6 className="font-14">Vehicle</h6>
                  <p>
                    {data?.vehicle
                      ? `${data.vehicle?.type ?? ''} - ${data.vehicle?.reg_number ?? ''}`
                      : '-'}
                  </p>
                </Col>
                <Col sm={6} md={3}>
                  <h6 className="font-14">Property</h6>
                  <p>{data?.customer_property_name ?? '-'}</p>
                </Col>
                <Col sm={6} md={3}>
                  <h6 className="font-14">Start Time</h6>
                  <p>
                    {data?.start_time && data?.date
                      ? moment(`${data.date} ${data.start_time}`).format(
                          'hh:mm A'
                        )
                      : '-'}
                  </p>
                </Col>
                <Col sm={6} md={3}>
                  <h6 className="font-14">End Time</h6>
                  <p>
                    {data?.end_time && data?.date
                      ? moment(`${data.date} ${data.end_time}`).format(
                          'hh:mm A'
                        )
                      : '-'}
                  </p>
                </Col>
                <Col sm={6} md={3}>
                  <h6 className="font-14">Total Time Taken</h6>
                  <p>{data?.total_hours ? `${data.total_hours} Hrs` : '-'}</p>
                </Col>

                {data?.vehicle?.type === FLEET_VEHICLE_TYPE_OPTIONS_PLANE ? (
                  <>
                    <Col sm={6} md={3}>
                      <h6 className="font-14">Total Flying Hours</h6>
                      <p>{data?.total_flying_hours ?? '-'}</p>
                    </Col>
                    <Col sm={6} md={3}>
                      <h6 className="font-14">R&D Flying Hours</h6>
                      <p>{data?.rnd_flying_hours ?? '-'}</p>
                    </Col>
                    <Col sm={6} md={3}>
                      <h6 className="font-14">Non-R&D Flying Hours</h6>
                      <p>{data?.non_rnd_flying_hours ?? '-'}</p>
                    </Col>
                  </>
                ) : (
                  <Col sm={6} md={3}>
                    <h6 className="font-14">Total Distance</h6>
                    <p>{data?.total_kms ? `${data.total_kms} Km` : '-'}</p>
                  </Col>
                )}

                <Col md={12}>
                  <h6 className="font-14">Notes</h6>
                  <div>{data?.notes ? parse(data.notes) : '-'}</div>
                </Col>
              </Row>

              {data?.vehicle?.type !== FLEET_VEHICLE_TYPE_OPTIONS_PLANE && (
                <>
                  <div>
                    <h5 className="text-uppercase text-soft-gray">
                      Odometer Readings
                    </h5>
                    <Row>
                      <Col sm={6} md={3}>
                        <h6 className="font-14">Start Reading</h6>
                        <p>{data?.start_odometer_reading ?? '-'}</p>
                      </Col>
                      <Col sm={6} md={3}>
                        <h6 className="font-14">End Reading</h6>
                        <p>{data?.end_odometer_reading ?? '-'}</p>
                      </Col>
                    </Row>
                  </div>

                  <div>
                    <h5 className="text-uppercase text-soft-gray">
                      Travel Types
                    </h5>
                    <Row>
                      <Col sm={6} md={3}>
                        <h6 className="font-14">Personal Work</h6>
                        <p>
                          {data?.personal_kms ? `${data.personal_kms} Km` : '-'}
                        </p>
                      </Col>
                      <Col sm={6} md={3}>
                        <h6 className="font-14">Office Work</h6>
                        <p>{data?.work_kms ? `${data.work_kms} Km` : '-'}</p>
                      </Col>
                    </Row>
                  </div>

                  <div>
                    <h5 className="text-uppercase text-soft-gray">
                      Distance Types
                    </h5>
                    <Row>
                      <Col sm={6} md={3}>
                        <h6 className="font-14">R&D Distance</h6>
                        <p>
                          {data?.rnd_distance ? `${data.rnd_distance} Km` : '-'}
                        </p>
                      </Col>
                      <Col sm={6} md={3}>
                        <h6 className="font-14">Non-R&D Distance</h6>
                        <p>
                          {data?.non_rnd_distance
                            ? `${data.non_rnd_distance} Km`
                            : '-'}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <h5 className="text-uppercase text-soft-gray">
                      Road Types
                    </h5>
                    <Row>
                      <Col sm={6} md={3}>
                        <h6 className="font-14">Public Road</h6>
                        <p>
                          {data?.public_road_distance
                            ? `${data.public_road_distance} Km`
                            : '-'}
                        </p>
                      </Col>
                      <Col sm={6} md={3}>
                        <h6 className="font-14">Private Road</h6>
                        <p>
                          {data?.private_road_distance
                            ? `${data.private_road_distance} Km`
                            : '-'}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewTravelDiary;
