import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import {
  LOG,
  SITE_NOTES,
  UDOSE_STOP,
} from '../../../../../../constants/siteNotes';
import ListSiteNotes from './ListSiteNotes';
import ListSiteLogs from './ListSiteLogs';
import ListUdoseStopReasons from './manualDoserStopReason/ListUdoseStopReasons';

const SiteLogs: React.FC = () => {
  const { id: siteId } = useParams();
  const [noteType, setNoteType] = useState<string>(UDOSE_STOP);

  const renderNoteType = (noteTypeName: string) => {
    switch (noteTypeName) {
      case SITE_NOTES:
        return (
          <ListSiteNotes
            siteId={Number(siteId)}
            noteType={noteType}
            setNoteType={setNoteType}
          />
        );
      case LOG:
        return (
          <ListSiteLogs
            siteId={Number(siteId)}
            noteType={noteType}
            setNoteType={setNoteType}
          />
        );
      case UDOSE_STOP:
        return (
          <ListUdoseStopReasons
            siteId={Number(siteId)}
            noteType={noteType}
            setNoteType={setNoteType}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Card>
      <Card.Body>{renderNoteType(noteType)}</Card.Body>
    </Card>
  );
};

export default SiteLogs;
