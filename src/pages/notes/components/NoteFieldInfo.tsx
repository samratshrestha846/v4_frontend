import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { MaintenanceNote } from '../../../types/notes/maintenance';
import { formattedShortDate } from '../../../helpers';

type Props = {
  note?: MaintenanceNote;
};

const NoteFieldInfo: React.FC<Props> = ({ note }) => {
  return (
    <Row>
      <Col xs={6} sm={3} md={3}>
        <h6 className="font-14">Date</h6>
        <p>{note?.date ? formattedShortDate(note.date) : '-'}</p>
      </Col>
      <Col xs={6} sm={3} md={3}>
        <h6 className="font-14">Property</h6>
        <p>{note?.customer_property_name ?? '-'}</p>
      </Col>
      <Col xs={6} sm={3} md={3}>
        <h6 className="font-14">Site</h6>
        <p>{note?.site_name ?? '-'}</p>
      </Col>
      <Col xs={6} sm={3} md={3}>
        <h6 className="font-14">Device Serial Number</h6>
        <p>{note?.device_serial_number ?? '-'}</p>
      </Col>
      <Col xs={6} sm={3} md={3}>
        <h6 className="font-14">Note Taker</h6>
        <p>{note?.performer?.name ?? '-'}</p>
      </Col>
    </Row>
  );
};

export default NoteFieldInfo;
