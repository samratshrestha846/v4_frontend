import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { formattedDatetime } from '@uhub/helpers';
import { ActivityLogResponse } from '../types/ActivityLog';

type Props = {
  activityLog: ActivityLogResponse;
};

const ActivityLogInfo: React.FC<Props> = ({ activityLog }) => {
  return (
    <Row>
      <Col sm={6} md={4}>
        <h6 className="font-14">Subject Type </h6>
        <p>{activityLog?.subject_type ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Subject Title</h6>
        <p>{activityLog?.subject?.title ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Author</h6>
        <p>{activityLog?.causer?.name ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Event</h6>
        <p>{activityLog?.event ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Description</h6>
        <p>{activityLog?.description ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Created Date</h6>
        <p>
          {activityLog?.created_at
            ? formattedDatetime(activityLog?.created_at)
            : '-'}
        </p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Updated Date</h6>
        <p>
          {activityLog?.updated_at
            ? formattedDatetime(activityLog?.updated_at)
            : '-'}
        </p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Current Values</h6>
        <p>
          Status: {activityLog.properties.attributes?.status ?? '-'} <br />
          Updated at:
          {activityLog.properties.attributes.updated_at
            ? formattedDatetime(activityLog.properties.attributes.updated_at)
            : '-'}
        </p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Old Values</h6>
        <p>
          Status: {activityLog.properties?.old?.status ?? ' -'} <br />
          Updated at:
          {activityLog.properties?.old?.updated_at
            ? formattedDatetime(activityLog.properties.attributes.updated_at)
            : ' -'}
        </p>
      </Col>
    </Row>
  );
};

export default ActivityLogInfo;
