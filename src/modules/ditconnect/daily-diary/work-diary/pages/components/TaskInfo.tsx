import React from 'react';
import { Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import { RnDResponse } from '../../types/WorkDiary';

type Props = {
  task: RnDResponse;
  title?: string;
};

const TaskInfo: React.FC<Props> = ({ task, title }) => {
  return (
    <>
      <h5 className="text-uppercase text-soft-gray">{title ?? ''}</h5>
      <Row>
        <Col sm={6} md={3}>
          <h6 className="font-14">Activity</h6>
          <p>{task?.activity?.name ?? '-'}</p>
        </Col>
        <Col sm={6} md={3}>
          <h6 className="font-14">Group</h6>
          <p>{task?.activity?.group ?? '-'}</p>
        </Col>
        <Col sm={6} md={3}>
          <h6 className="font-14">Total Hours</h6>
          <p>{task?.rnd_hours ?? '-'}</p>
        </Col>
        <Col md={12}>
          <h6 className="font-14">Descriptions</h6>
          <div>{task.rnd_description ? parse(task.rnd_description) : '-'}</div>
        </Col>
      </Row>
    </>
  );
};

export default TaskInfo;
