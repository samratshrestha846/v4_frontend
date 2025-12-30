import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { convertToSentence } from '@uhub/helpers';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { StaffResponse } from '../types/Staff';
import { STATUS_ACTIVE } from '../../../../constants/constants';

type Props = {
  staff: StaffResponse;
};

const StaffInfo: React.FC<Props> = ({ staff }) => {
  return (
    <Row>
      <Col sm={6} md={4}>
        <h6 className="font-14">Staff Name </h6>
        <p>
          {staff?.user
            ? `${staff.user.first_name} ${staff.user.last_name}`
            : '-'}
        </p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Email</h6>
        <p>{staff?.user?.email ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Status</h6>
        <p>
          {staff?.status ? (
            <IconLabelStatus
              iconTextClass={
                Number(staff.status) === STATUS_ACTIVE
                  ? 'text-success'
                  : 'text-gray'
              }
              label={
                Number(staff.status) === STATUS_ACTIVE ? 'Active' : 'Inactive'
              }
            />
          ) : (
            '-'
          )}
        </p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Mobile No.</h6>
        <p>{staff?.mobile_number ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Position</h6>
        <p>{staff?.position ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Department</h6>
        <p>{staff?.department ?? '-'}</p>
      </Col>
      <Col sm={6} md={4}>
        <h6 className="font-14">Role</h6>
        <p>{staff?.role ? convertToSentence(staff.role) : '-'}</p>
      </Col>
    </Row>
  );
};

export default StaffInfo;
