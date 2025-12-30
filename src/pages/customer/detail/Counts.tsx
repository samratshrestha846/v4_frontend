import classNames from 'classnames';
import React from 'react';
import { Card } from 'react-bootstrap';

type Props = {
  text: string;
  count: string | number;
  icon: string;
  variant: string;
};

const Counts: React.FC<Props> = ({ text, count, icon, variant }) => {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <div className="flex-shrink-0 me-3">
            <div className="avatar-sm">
              <span
                className={classNames(
                  'avatar-title',
                  `bg-${variant}-lighten`,
                  `text-${variant}`,
                  'rounded'
                )}>
                <i className={classNames(icon, 'font-24')} />
              </span>
            </div>
          </div>
          <div className="flex-grow-1">
            <p className="mt-0 mb-1">{text}</p>
            <h5 className="mb-0">{count}</h5>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Counts;
