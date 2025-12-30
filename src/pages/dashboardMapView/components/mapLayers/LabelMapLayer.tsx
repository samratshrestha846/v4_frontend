import React, { FC } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

type Props = {
  featureItem: any;
  item: any;
};

const LabelMapLayer: FC<Props> = ({ featureItem, item }) => {
  return (
    <Marker
      position={L.geoJSON(featureItem).getBounds().getCenter()}
      icon={L.divIcon({
        className: 'label',
        html: `<span style="font-family: ${
          item?.style?.font?.labelFontFamily
        }; font-size: ${item?.layerData?.style?.font?.labelFontSize}; color: ${
          item?.style?.font?.labelFontColor
        }; display:flex; ">${
          featureItem?.properties?.name ? featureItem?.properties?.name : ''
        }</span>`,
      })}
    />
  );
};

export default LabelMapLayer;
