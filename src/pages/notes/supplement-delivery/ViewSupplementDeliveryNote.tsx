import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import NoteInfo from '../components/NoteInfo';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import useReadSupplementDeliveryNote from './hooks/useReadSupplementDeliveryNote';
import SupplementDeliveryFieldNoteInfo from './SupplementDeliveryFieldNoteInfo';

const ViewSupplementDeliveryNote: React.FC = () => {
  const { id } = useParams();
  const {
    data: noteData,
    isFetching,
    isError,
  } = useReadSupplementDeliveryNote(Number(id));

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Notes', path: '/notes/list' },
          {
            label: noteData?.site?.name ?? 'Note Detail',
            path: '',
            active: true,
          },
        ]}
        title="Supplement Delivery Note Details"
      />

      <Card>
        <Card.Body>
          <SupplementDeliveryFieldNoteInfo note={noteData} />
          <Row className="mt-2">
            <Col md={12}>
              <NoteInfo
                note={noteData?.admin_notes}
                title="Note for Admin"
                attachments={noteData?.attachments}
              />
            </Col>
            <Col md={12}>
              <NoteInfo
                note={noteData?.customer_notes}
                title="Note for Customer"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewSupplementDeliveryNote;
