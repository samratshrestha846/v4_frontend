import React, { SetStateAction } from 'react';
import { FeatureGroup, GeoJSON } from 'react-leaflet';
import {
  layerLandOnlyStyle,
  layerStateAndCostalWaterStyle,
} from '../../../../assets/gis/mlaLayerStyle';

type Props = {
  setLoadingMla: React.Dispatch<SetStateAction<boolean>>;
  landData: any;
  coastalData: any;
};

const MlaLayer: React.FC<Props> = ({
  setLoadingMla,
  landData,
  coastalData,
}) => {
  const onEachFeature = (feature: any, layer: any) => {
    const label = feature.properties.NRM_REGION;
    layer.bindTooltip(label);
  };

  return (
    <FeatureGroup
      eventHandlers={{
        add: () => setLoadingMla(false),
      }}>
      {landData && (
        <GeoJSON
          data={landData}
          style={layerLandOnlyStyle}
          onEachFeature={onEachFeature}
        />
      )}
      {coastalData && (
        <GeoJSON
          data={coastalData}
          style={layerStateAndCostalWaterStyle}
          onEachFeature={onEachFeature}
        />
      )}
    </FeatureGroup>
  );
};

export default MlaLayer;
