import React, { FC } from 'react';
import CustomLoader from '../../../../../components/CustomLoader';

type props = {
  ciboLabsData: any;
  isFetchingCiboLabs: boolean;
};

const CiboLabs: FC<props> = ({ ciboLabsData, isFetchingCiboLabs }) => {
  if (isFetchingCiboLabs) {
    return <CustomLoader />;
  }

  return (
    <div>
      {ciboLabsData ? (
        <div>
          <strong>Cibo Labs Layer</strong> within <strong>8 km</strong> from the
          dosers location is displayed in the map.
          <br />
          <div>Click on the layer to view the details. </div>
        </div>
      ) : (
        <div className="text-center m-2 text-black-50">No data available</div>
      )}
    </div>
  );
};

export default CiboLabs;
