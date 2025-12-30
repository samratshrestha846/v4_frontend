/* eslint-disable no-nested-ternary */
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';

import useReadAlarm from './hooks/useReadAlarm';

import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import PageTitle from '../../components/PageTitle';
import ActiveInactiveStatus from '../../components/ActiveInactiveStatus';

import {
  EXTERNAL_VISIBILITY_NO,
  EXTERNAL_VISIBILITY_YES,
  STATUS_ACTIVE,
} from '../../constants/constants';

const ViewAlarm: React.FC = () => {
  const { id } = useParams();
  const { data: alarmData, isFetching, isError } = useReadAlarm(Number(id));

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Alarms', path: '/alarm/list' },
          {
            label: 'Detail',
            path: '',
            active: true,
          },
        ]}
        title="Alarm Detail"
      />
      <Card>
        <Card.Body>
          <Row>
            <Col xs={6} sm={3} md={3}>
              <h6 className="font-14">Severity Level</h6>
              <p>{alarmData?.severity_level ?? '-'}</p>
            </Col>
            <Col xs={6} sm={3} md={3}>
              <h6 className="font-14">Alarm Code</h6>
              <p>{alarmData?.alarm_code ?? '-'}</p>
            </Col>

            <Col xs={6} sm={3} md={3}>
              <h6 className="font-14">Status</h6>
              {alarmData?.status ? (
                <ActiveInactiveStatus
                  isActive={alarmData?.status === STATUS_ACTIVE}
                />
              ) : (
                '-'
              )}
            </Col>

            <Col xs={6} sm={3} md={3}>
              <h6 className="font-14">External Visibility</h6>
              <p>
                {alarmData?.visible_to_customers === EXTERNAL_VISIBILITY_YES
                  ? 'Yes'
                  : alarmData?.visible_to_customers === EXTERNAL_VISIBILITY_NO
                    ? 'No'
                    : '-'}
              </p>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <h6 className="font-14">Description</h6>
              <p>{alarmData?.description ?? '-'}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h6 className="font-14">Potential Action</h6>
          {alarmData?.potential_actions
            ? parse(alarmData.potential_actions)
            : '-'}
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewAlarm;
