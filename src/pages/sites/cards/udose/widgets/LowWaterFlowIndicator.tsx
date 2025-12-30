import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LeakageIcon } from '../../../../../assets/icons';

type Props = {
  message?: string | null;
  tooltipPlacement?: any;
};

const LowWaterFlowIndicator: React.FC<Props> = ({
  message,
  tooltipPlacement,
}) => {
  return message ? (
    <OverlayTrigger
      placement={tooltipPlacement}
      overlay={<Tooltip id="view">{message}</Tooltip>}>
      <LeakageIcon
        width={18}
        height={18}
        className="blinking-icon ms-1 text-danger-500"
      />
    </OverlayTrigger>
  ) : (
    <LeakageIcon
      width={18}
      height={18}
      className="blinking-icon ms-1 text-danger-500"
    />
  );
};
export default LowWaterFlowIndicator;
