import React from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  tooltipText: string;
  url: string;
  displayText: string;
  target?: string;
};

const OverlayTooltip: React.FC<Props> = ({
  tooltipText,
  url,
  displayText,
  target,
}) => {
  return (
    <OverlayTrigger
      key="site-name"
      placement="bottom"
      overlay={<Tooltip id="tooltip-bottom">{tooltipText}</Tooltip>}>
      <Link to={url} target={target}>
        {displayText}
      </Link>
    </OverlayTrigger>
  );
};

export default OverlayTooltip;
