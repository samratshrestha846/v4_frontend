import React, { SetStateAction, useEffect } from 'react';
import { useMap } from 'react-leaflet';

type Props = {
  setZoomLevel: React.Dispatch<SetStateAction<number>>;
};

const TrackMapZoomLevel: React.FC<Props> = ({ setZoomLevel }) => {
  const map = useMap();
  useEffect(() => {
    const handleZoomChange = () => {
      setZoomLevel(map.getZoom());
    };

    map.on('zoomend', handleZoomChange);

    return () => {
      map.off('zoomend', handleZoomChange);
    };
  }, [map]);
  return null;
};

export default TrackMapZoomLevel;
