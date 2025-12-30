import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { formattedShortDate } from '../../../helpers';
import { SupplementDelivery } from '../../../types/notes/supplementDeliveries';

type Props = {
  note?: SupplementDelivery;
};

const SupplementDeliveryFieldNoteInfo: React.FC<Props> = ({ note }) => {
  return (
    <>
      <h5 className="m-0 text-slate-gray text-uppercase">Note Info</h5>
      <div className="px-2 mb-2">
        <Row>
          <Col xs={6} sm={3} md={3}>
            <h6 className="font-14">Date</h6>
            <p>{note?.date ? formattedShortDate(note.date) : '-'}</p>
          </Col>
          <Col xs={6} sm={3} md={3}>
            <h6 className="font-14">Property</h6>
            <p>{note?.customer_property?.name ?? '-'}</p>
          </Col>
          <Col xs={6} sm={3} md={3}>
            <h6 className="font-14">Site</h6>
            <p>{note?.site?.name ?? '-'}</p>
          </Col>
          <Col xs={6} sm={3} md={3}>
            <h6 className="font-14">Note Taker</h6>
            <p>{note?.performer?.name ?? '-'}</p>
          </Col>
        </Row>
      </div>
      <h5 className="m-0 text-slate-gray text-uppercase">Supplement Info</h5>
      <div className="px-2">
        <Row>
          <Col xs={6} sm={3} md={3}>
            <h6 className="font-14">Supplement</h6>
            <p>{note?.supplement ? note?.supplement?.name : '-'}</p>
          </Col>
          <Col xs={6} sm={3} md={3}>
            <h6 className="font-14">Quantity</h6>
            <p>{note?.qty ? `${note?.qty} Unit` : '-'}</p>
          </Col>
          <Col xs={6} sm={3} md={3}>
            <h6 className="font-14">Stock Location</h6>
            <p>{note?.stock_location ?? '-'}</p>
          </Col>

          <Col xs={6} sm={3} md={3}>
            <h6 className="font-14">Delivered Location</h6>
            <p>{note?.to_location ?? '-'}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SupplementDeliveryFieldNoteInfo;
