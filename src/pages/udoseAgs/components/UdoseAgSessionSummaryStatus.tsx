import React from 'react';
import {
  UDOSE_AG_SESSION_STATUS_ARMED,
  UDOSE_AG_SESSION_STATUS_COMPLETED,
  UDOSE_AG_SESSION_STATUS_RUNNING,
  UDOSE_AG_SESSION_STATUS_STARTED,
} from '../../../constants/udoseAg';
import IconLabelStatus from '../../../components/IconLabelStatus';

type Props = {
  status: string;
};

const UdoseAgSessionSummaryStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case UDOSE_AG_SESSION_STATUS_ARMED:
      return (
        <IconLabelStatus
          label={UDOSE_AG_SESSION_STATUS_ARMED}
          iconTextClass="text-warning"
        />
      );

    case UDOSE_AG_SESSION_STATUS_STARTED:
      return (
        <IconLabelStatus
          label={UDOSE_AG_SESSION_STATUS_STARTED}
          iconTextClass="text-info"
        />
      );

    case UDOSE_AG_SESSION_STATUS_RUNNING:
      return (
        <IconLabelStatus
          label={UDOSE_AG_SESSION_STATUS_RUNNING}
          iconTextClass="text-light-green"
        />
      );

    case UDOSE_AG_SESSION_STATUS_COMPLETED:
      return (
        <IconLabelStatus
          label={UDOSE_AG_SESSION_STATUS_COMPLETED}
          iconTextClass="text-success"
        />
      );

    default:
      return <>-</>;
  }
};

export default UdoseAgSessionSummaryStatus;
