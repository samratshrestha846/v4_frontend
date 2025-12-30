import React from 'react';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import { UdoseAgSessionSummary } from '../../../types/udoseAgs/udoseAgs';
import UdoseAgListSessionItem from '../../udoseAgs/components/UdoseAgListSessionItem';

type Props = {
  sessionSummary?: UdoseAgSessionSummary;
  isFetchingSessionSummary?: boolean;
  isErrorSessionSummary?: boolean;
};

const UdoseAgSessionSummaryInfo: React.FC<Props> = ({
  sessionSummary,
  isFetchingSessionSummary,
  isErrorSessionSummary,
}) => {
  if (isFetchingSessionSummary) return <CustomLoader />;

  if (isErrorSessionSummary) return <ErrorMessage />;

  return (
    <div className="mb-3 session-summary-item">
      {sessionSummary && <UdoseAgListSessionItem data={sessionSummary} />}
    </div>
  );
};

export default UdoseAgSessionSummaryInfo;
