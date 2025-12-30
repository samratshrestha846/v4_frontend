import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import useReadMaintenanceNote from './hooks/useReadMaintenanceNote';
import NoteInfo from '../components/NoteInfo';
import NoteFieldInfo from '../components/NoteFieldInfo';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

const ViewMaintenanceNote: React.FC = () => {
  const { id } = useParams();
  const {
    data: noteData,
    isFetching,
    isError,
  } = useReadMaintenanceNote(Number(id));

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Notes', path: '/notes/list' },
          {
            label: noteData?.site_name ?? 'Note Detail',
            path: '',
            active: true,
          },
        ]}
        title="Maintenance Note Detail"
      />
      <Card>
        <Card.Body>
          <NoteFieldInfo note={noteData} />
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

export default ViewMaintenanceNote;
