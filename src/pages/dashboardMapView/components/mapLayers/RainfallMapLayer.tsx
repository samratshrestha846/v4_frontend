import L from 'leaflet';
import React, { FC, SetStateAction, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

const geoblaze = require('geoblaze');

type Props = {
  rainfallLayer: any;
  rainfallHide: boolean;
  georasterData: any;
  setFetchingRaster: React.Dispatch<SetStateAction<boolean>>;
};

const RainfallMapLayer: FC<Props> = ({
  rainfallLayer,
  rainfallHide,
  georasterData,
  setFetchingRaster,
}) => {
  const map = useMap();
  const layerRef = useRef<any>(null);

  useEffect(() => {
    const removeClickEventListener = () => {
      map.off('click');
    };

    const removePreviousLayer = () => {
      if (layerRef.current) {
        removeClickEventListener();
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };

    const addNewLayer = () => {
      if (rainfallLayer) {
        rainfallLayer.addTo(map);
        setFetchingRaster(false);

        map.on('click', function handleClick(evt: any) {
          const latlng = map.mouseEventToLatLng(evt.originalEvent);

          if (rainfallLayer && rainfallLayer.getBounds().contains(latlng)) {
            const rainfallval = geoblaze.identify(georasterData, [
              latlng.lng,
              latlng.lat,
            ]);

            if (rainfallval[0] >= 0) {
              L.popup()
                .setLatLng(latlng)
                .setContent(`Rainfall: ${rainfallval[0].toFixed(4)}mm`)
                .openOn(map);
            }
          }
        });

        layerRef.current = rainfallLayer;
      }
    };

    removePreviousLayer();
    if (!rainfallHide) {
      addNewLayer();
    }
    return () => {
      removePreviousLayer();
    };
  }, [rainfallLayer, rainfallHide]);

  return null;
};
export default RainfallMapLayer;
