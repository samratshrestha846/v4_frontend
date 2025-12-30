import useToggle from '@uhub/hooks/common/useToggle';
import classNames from 'classnames';
import React from 'react';
import { Card, Collapse } from 'react-bootstrap';

type Props = {
  title: string;
  children: React.ReactNode;
  isDefaultOpen?: boolean;
  headerBgClass?: string;
  cardClass?: string;
};

const Collapsible: React.FC<Props> = ({
  title,
  children,
  isDefaultOpen,
  headerBgClass,
  cardClass,
}) => {
  const { status, toggle } = useToggle(isDefaultOpen);
  return (
    <div className="d-flex flex-column mb-1">
      <button
        type="button"
        className={classNames(
          'btn btn-link btn-sm p-0 m-0 b-0 flex-grow-1 d-block'
        )}
        onClick={toggle}>
        <div
          className={classNames(
            'd-flex justify-content-start align-items-center gap-1 px-2 py-1',
            headerBgClass ?? 'bg-ghost-white',
            status ? 'rounded-top' : 'rounded-2'
          )}>
          <i
            className={classNames(
              'fw-bold',
              status
                ? 'bx bx-chevron-down text-primary'
                : 'bx bx-chevron-right text-gray'
            )}
          />
          <h4 className="text-primary-color m-0 font-14">{title ?? ''}</h4>
        </div>
      </button>

      <Collapse in={status}>
        <Card className={classNames('m-0', cardClass ?? 'tilebox-one')}>
          <Card.Body>{children}</Card.Body>
        </Card>
      </Collapse>
    </div>
  );
};

export default Collapsible;
