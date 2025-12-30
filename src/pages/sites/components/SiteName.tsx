import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { can } from '../../../helpers/checkPermission';
import { UPDATE_UDOSE } from '../../../constants/permissions';
import { prepareDynamicUrl } from '../../../helpers';
import { UDOSE_EDIT } from '../../../constants/path';
import TruncateTextWithOverlayTooltip from '../../../components/TruncateTextWithOverlayTooltip';

type Props = {
  siteId: number;
  siteName: string;
};

const SiteName: React.FC<Props> = ({ siteId, siteName }) => {
  const canUpdateUdose = can(UPDATE_UDOSE);

  return canUpdateUdose ? (
    <div className="d-flex justify-content-start align-items-center m-0 text-primary ">
      <h3 className="m-0 text-primary">
        <TruncateTextWithOverlayTooltip
          text={siteName}
          endIndex={20}
          tooltipPlacement="bottom"
        />
      </h3>
      <OverlayTrigger
        key="site-name"
        placement="bottom"
        overlay={<Tooltip id="tooltip-bottom">Edit Site</Tooltip>}>
        <Link
          to={prepareDynamicUrl(UDOSE_EDIT, siteId)}
          target="_blank"
          className="edit-link">
          <i className="ms-1 bx bx-edit" />
        </Link>
      </OverlayTrigger>
    </div>
  ) : (
    <h3 className="m-0 text-primary">
      <TruncateTextWithOverlayTooltip
        text={siteName}
        endIndex={20}
        tooltipPlacement="bottom"
      />
    </h3>
  );
};

export default SiteName;
