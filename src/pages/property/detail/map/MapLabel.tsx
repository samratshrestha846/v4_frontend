import React, { FC } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { MapData } from '../../../../types/property/mapLayer';

type Props = {
  featureItem: any;
  item: MapData;
};

const MapLabel: FC<Props> = ({ featureItem, item }) => {
  return (
    <Marker
      position={L.geoJSON(featureItem).getBounds().getCenter()}
      icon={L.divIcon({
        className: 'label',
        html: `<span style="font-family: ${
          item?.layerData?.style?.font?.labelFontFamily
        }; font-size: ${item?.layerData?.style?.font?.labelFontSize}; color: ${
          item?.layerData?.style?.font?.labelFontColor
        }; display:flex; ">${
          featureItem?.properties?.name ? featureItem?.properties?.name : ''
        }</span>`,
      })}
    />
  );
};

export default MapLabel;
