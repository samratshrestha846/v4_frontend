import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';
import classNames from 'classnames';
import { firstCharOfWords } from '../helpers';

type Props = {
  name: string;
  concentration?: number;
  initialCharacters?: string;
  bgColorClass?: string;
  textClass?: string;
  tooltipPlacement?: Placement;
};

const SupplementIconCard: React.FC<Props> = ({
  name,
  concentration,
  initialCharacters,
  bgColorClass,
  textClass,
  tooltipPlacement,
}) => {
  return (
    <div className="supplement-icon-card">
      <OverlayTrigger
        placement={tooltipPlacement ?? 'bottom'}
        overlay={
          <Tooltip id="view">
            <span>
              {name ? (
                <p className="m-0 font-10">
                  {name} {concentration ? `(${concentration}%)` : null}
                </p>
              ) : null}
            </span>
          </Tooltip>
        }>
        <span
          className={classNames(
            'd-flex justify-content-center align-items-center avatar-xs rounded-circle',
            bgColorClass ?? 'bg-success',
            textClass ?? 'font-10 text-white text-uppercase'
          )}>
          {initialCharacters ?? firstCharOfWords(name)}
        </span>
      </OverlayTrigger>
    </div>
  );
};

export default SupplementIconCard;
