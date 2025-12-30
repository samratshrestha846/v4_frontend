import classNames from 'classnames';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { firstCharOfWords, getRandomNumber } from '../helpers';

type Props = {
  fullName: string;
  assignedRole?: string;
  initialCharacters?: string;
  showTooltip?: boolean;
};

const CircleNameInitials: React.FC<Props> = ({
  fullName,
  assignedRole,
  initialCharacters,
  showTooltip = true,
}) => {
  const bgColors = [
    'bg-skyBlue',
    'bg-purple',
    'bg-teal',
    'bg-yellow',
    'bg-gray',
    'bg-light',
    'bg-success',
    'bg-info',
    'bg-danger',
    'bg-warning',
  ];
  const randomNumber = getRandomNumber(0, bgColors.length);
  const randomBgColor = [...bgColors].reverse()[randomNumber];

  return (
    <div className={classNames('avatar-xs rounded-circle', randomBgColor)}>
      {showTooltip ? (
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id="view">
              <span>
                <h6 className="m-0">{fullName}</h6>
                {assignedRole ? (
                  <p className="m-0 font-10">{assignedRole}</p>
                ) : null}
              </span>
            </Tooltip>
          }>
          <span className="avatar-title bg-secondary-lighten rounded-circle font-10 text-uppercase">
            {initialCharacters ?? firstCharOfWords(fullName)}
          </span>
        </OverlayTrigger>
      ) : (
        <span className="avatar-title bg-secondary-lighten rounded-circle font-10 text-uppercase">
          {initialCharacters ?? firstCharOfWords(fullName)}
        </span>
      )}
    </div>
  );
};

export default CircleNameInitials;
