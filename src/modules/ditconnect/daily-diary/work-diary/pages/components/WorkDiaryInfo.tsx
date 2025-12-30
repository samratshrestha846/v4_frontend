import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { formattedShortDate } from '@uhub/helpers';

import { WorkDiaryResponse } from '../../types/WorkDiary';

type Props = {
  workDiary: WorkDiaryResponse;
};

const WorkDiaryInfo: React.FC<Props> = ({ workDiary }) => {
  return (
    <>
      <h5 className="text-uppercase text-soft-gray">Task Details</h5>
      <Row>
        <Col sm={6} md={3}>
          <h6 className="font-14">Date</h6>
          <p>{workDiary?.date ? formattedShortDate(workDiary.date) : '-'}</p>
        </Col>
        <Col sm={6} md={3}>
          <h6 className="font-14">Total Hours</h6>
          <p>{workDiary?.total_hours ?? '-'}</p>
        </Col>
        <Col sm={6} md={3}>
          <h6 className="font-14">User Name</h6>
          <p>{workDiary?.user ? (workDiary.user?.name ?? '') : '-'}</p>
        </Col>
      </Row>
    </>
  );
};

export default WorkDiaryInfo;
