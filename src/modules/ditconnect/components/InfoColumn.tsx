import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type InfoColumnProps = {
  label: string;
  value?: string | number | null;
  colSpan?: number;
  type?: string | null;
  smColSpan?: number;
  url?: string;
};

// eslint-disable-next-line import/prefer-default-export
export const InfoColumn = ({
  label,
  value,
  colSpan = 3,
  type = null,
  smColSpan = 4,
  url,
}: InfoColumnProps) => (
  <Col sm={smColSpan || colSpan} md={colSpan}>
    <h6 className="font-14">{label}</h6>
    {type === 'html' && value && (
      <p
        className="text-sm lh-150"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )}

    {value && !type && <p className="text-sm lh-150">{value ?? '-'}</p>}

    {url && (
      <Link to={url} target="_blank">
        {url}
      </Link>
    )}
  </Col>
);
