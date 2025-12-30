import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  text: string;
  tooltipPlacement?: any;
  startIndex?: number;
  endIndex?: number;
};

const TruncateTextWithOverlayTooltip: React.FC<Props> = ({
  text,
  tooltipPlacement = 'top',
  startIndex = 0,
  endIndex,
}): any => {
  if (!text) return '';

  if (typeof startIndex !== 'number' || typeof endIndex !== 'number')
    return text;

  if (startIndex && endIndex && startIndex > endIndex) return text;

  return text.length > endIndex ? (
    <OverlayTrigger
      placement={tooltipPlacement}
      overlay={
        <Tooltip id="view">
          <span>{text}</span>
        </Tooltip>
      }>
      <span className="text-nowrap">
        {endIndex && endIndex < text.length
          ? `${text.slice(startIndex, endIndex)}...`
          : text}
      </span>
    </OverlayTrigger>
  ) : (
    <span className="text-nowrap">{text}</span>
  );
};

export default TruncateTextWithOverlayTooltip;
