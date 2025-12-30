import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { PolicyResponse } from '../types/Policy';

type Props = {
  policy: PolicyResponse;
};

const PolicyInfo: React.FC<Props> = ({ policy }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col sm={6} md={4}>
              <h6 className="font-14">Policy Title </h6>
              <p>{policy?.title ?? '-'}</p>
            </Col>
            <Col sm={6} md={4}>
              <h6 className="font-14">Policy File</h6>
              {policy?.file_url ? (
                <a href={policy?.file_url} target="_blank" rel="noreferrer">
                  <i className="bx bxs-file-pdf me-1" />
                  View File
                </a>
              ) : (
                <strong>No file</strong>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Row>
            <Col sm={6} md={4}>
              <h6 className="font-14">Accepted by</h6>
              {policy && policy.staffs?.length > 0 ? (
                <div className="d-flex justify-content-start align-items-center flex-wrap gap-2 mt-2 wrapper-max-height-16">
                  {policy.staffs?.map((staff) => (
                    <span
                      key={staff.user.name}
                      className="assigned-permission px-2 py-1">
                      {staff.user.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="m-2 text-center">Nobody has accepted</p>
              )}
            </Col>
            <Col sm={6} md={8}>
              <h6 className="font-14">Yet to Accept</h6>
              {policy && policy.yet_to_accept_policy?.length > 0 ? (
                <div className="d-flex justify-content-start align-items-center flex-wrap gap-2 mt-2 wrapper-max-height-16">
                  {policy.yet_to_accept_policy?.map((user) => (
                    <span
                      key={user.user.name}
                      className="assigned-permission px-2 py-1">
                      {user.user.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="m-2 text-center">Nobody yet to accept</p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default PolicyInfo;
