/* eslint-disable no-unused-vars */
import React from 'react';

type Props = {
  siteId: number;
  siteName: string;
  siteNumber?: string;
};

const UdoseAgName: React.FC<Props> = ({ siteId, siteName, siteNumber }) => {
  return (
    <h5 className="m-0 text-primary">
      {siteNumber ? `{siteName} - {siteNumber}` : siteName}
    </h5>
  );
};

export default UdoseAgName;
