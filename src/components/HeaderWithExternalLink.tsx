import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title?: string;
  linkPathname: string;
  linkSearchParam?: string;
  linkHashParam?: string;
};

const HeaderWithExternalLink: React.FC<Props> = ({
  title,
  linkPathname,
  linkSearchParam,
  linkHashParam,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center gap-2">
      <h5 className="m-0 text-primary-color">{title ?? ''}</h5>
      <Link
        to={{
          pathname: linkPathname,
          search: linkSearchParam ?? '',
          hash: linkHashParam ?? '',
        }}
        className="icon-font-1-25"
        target="_blank">
        <i className="bx bx-link-external font-18" />
      </Link>
    </div>
  );
};

export default HeaderWithExternalLink;
