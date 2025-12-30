import React, { FC, SetStateAction } from 'react';
import { FeatureGroup, GeoJSON, Popup } from 'react-leaflet';
import CiboLabsPopUp from '../../../property/detail/map/ciboLabs/CiboLabsPopUp';

type Props = {
  ciboLabsHide: boolean;
  ciboLabsData: any;
  setIsFetchingCiboLabs: React.Dispatch<SetStateAction<boolean>>;
};

const CiboLabsLayer: FC<Props> = ({
  ciboLabsHide,
  ciboLabsData,
  setIsFetchingCiboLabs,
}) => {
  const ciboLabsStyle = {
    fillColor: 'green',
    color: 'white',
    weight: 2,
  };

  return ciboLabsData && !ciboLabsHide ? (
    <FeatureGroup
      eventHandlers={{
        add: () => setIsFetchingCiboLabs(false),
      }}>
      {ciboLabsData.map((ciboLabs: any) => (
        <GeoJSON
          key={ciboLabs.location.name}
          data={ciboLabs.data}
          style={ciboLabsStyle}>
          <Popup>
            <CiboLabsPopUp
              feature={ciboLabs.data}
              name={ciboLabs.location.name}
            />
          </Popup>
        </GeoJSON>
      ))}
    </FeatureGroup>
  ) : null;
};
export default CiboLabsLayer;
