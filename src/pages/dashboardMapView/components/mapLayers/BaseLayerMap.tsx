import React, { useState } from 'react';
import { FeatureGroup, LayersControl, TileLayer } from 'react-leaflet';
import Loader from '../../../../components/Loader';

const BaseLayerMap = () => {
  const [loadingBaseMap, setLoadingBaseMap] = useState(true);

  return (
    <>
      {loadingBaseMap && <Loader />}
      <FeatureGroup
        eventHandlers={{
          add: () => {
            setLoadingBaseMap(false);
          },
        }}>
        <LayersControl.BaseLayer checked name="ESRI World Imagery">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Tiles &copy; Esri &mdash; Source: Esri"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            key={2}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </FeatureGroup>
    </>
  );
};

export default BaseLayerMap;
