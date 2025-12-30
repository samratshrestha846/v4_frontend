import React from 'react';
import { Link } from 'react-router-dom';
import { prepareDynamicUrl } from '../../../../helpers';
import { UDOSE_VIEW } from '../../../../constants/path';
import { can } from '../../../../helpers/checkPermission';
import { READ_UDOSE } from '../../../../constants/permissions';
import TruncateTextWithOverlayTooltip from '../../../../components/TruncateTextWithOverlayTooltip';

type Props = {
  siteId: number;
  siteName: string;
  siteNumber: number | null;
};

const UdoseSiteName: React.FC<Props> = ({ siteId, siteName, siteNumber }) => {
  const canReadUdose = can(READ_UDOSE);
  return canReadUdose ? (
    <Link
      className="dashboard-name-link"
      to={prepareDynamicUrl(UDOSE_VIEW, siteId)}>
      <h5 className="text-primary-color m-0">
        <TruncateTextWithOverlayTooltip
          text={siteNumber ? `${siteName} (${siteNumber})` : siteName}
          endIndex={30}
          tooltipPlacement="top"
        />
      </h5>
    </Link>
  ) : (
    <h5 className="text-primary-color m-0">
      <TruncateTextWithOverlayTooltip
        text={siteNumber ? `${siteName} (${siteNumber})` : siteName}
        endIndex={30}
        tooltipPlacement="top"
      />
    </h5>
  );
};

export default UdoseSiteName;
