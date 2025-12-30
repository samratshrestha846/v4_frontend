import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formattedDate, prepareDynamicUrl } from '../../../helpers';
import { UDOSE_VIEW } from '../../../constants/path';

type SiteInfoProps = {
  site?: any;
};

const SiteInfo = ({ site }: SiteInfoProps) => {
  if (!site) {
    return null;
  }
  let statusClass = 'secondary';
  let statusText = 'Stopped';

  if (site.is_alarmed) {
    statusText = 'Alarmed';
    statusClass = 'danger';
  } else if (site.is_running) {
    statusText = 'Running';
    statusClass = 'success';
  } else {
    statusText = 'Stopped';
    statusClass = 'secondary';
  }

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Installed At Site
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <h6 className="font-14 text-muted ">Site Name :</h6>
            <Link
              to={prepareDynamicUrl(UDOSE_VIEW, site.id)}
              target="_blank"
              className="text-primary">
              <p className="text-capitalize">{site.name}</p>
            </Link>
          </Col>
          <Col md={6}>
            <h6 className="font-14">
              <p className="text-muted">Status : </p>
            </h6>
            <p className="text-capitalize">
              <Badge className={`badge-outline-${statusClass}`}>
                {statusText}
              </Badge>
            </p>
          </Col>
          <Col md={6}>
            <h6 className="font-14">
              <span className="text-muted">Last Communication : </span>
            </h6>
            <p className="text-capitalize">
              {formattedDate(site.communicated_at)}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SiteInfo;
