/* eslint-disable react/no-danger */
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import NoteAttachments from './NoteAttachments';
import { NoteAttachment } from '../../../types/notes/maintenance';

type Props = {
  note?: string | null;
  title?: string;
  attachments?: NoteAttachment[];
};

const NoteInfo: React.FC<Props> = ({ note, title, attachments }) => {
  return (
    <Card>
      <Card.Body>
        <h5 className="mt-0 text-black">{title}</h5>
        <Row>
          <Col sm={12} md={12}>
            {note ? parse(note) : '-'}
          </Col>
        </Row>
        {attachments && attachments.length > 0 && (
          <>
            <hr />
            <NoteAttachments attachments={attachments} />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default NoteInfo;
