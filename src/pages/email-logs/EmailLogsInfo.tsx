import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { EmailLog } from '../../types/email-logs/emailLogs';
import { capitalizeFirstLetter, formattedDatetime } from '../../helpers';

type Props = {
  data?: EmailLog;
};

const EmailLogsInfo: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm={6} md={3}>
            <h6 className="font-14">Recipent</h6>
            <p className="text-sm lh-150">{data?.recipient ?? '-'}</p>
          </Col>

          <Col sm={6} md={3}>
            <h6 className="font-14">Subject</h6>
            <p className="text-sm lh-150">{data?.subject ?? '-'}</p>
          </Col>

          <Col sm={6} md={3}>
            <h6 className="font-14">Sent at</h6>
            <p className="text-sm lh-150">
              {formattedDatetime(data?.sent_at) ?? '-'}
            </p>
          </Col>
          <Col sm={6} md={3}>
            <h6 className="font-14">Status</h6>
            <p className="text-sm lh-150">
              {capitalizeFirstLetter(data?.status) ?? '-'}
            </p>
          </Col>
          <Col sm={6} md={3}>
            <h6 className="font-14">Error Message</h6>
            <p className="text-sm lh-150">{data?.error_message ?? '-'}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EmailLogsInfo;
