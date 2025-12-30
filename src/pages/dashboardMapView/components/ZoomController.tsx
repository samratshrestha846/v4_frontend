import React from 'react';
import { useMap } from 'react-leaflet';

const ZoomController = () => {
  const map = useMap();

  const zoomIn = (e: any) => {
    e.preventDefault();
    map.setZoom(map.getZoom() + 1);
  };
  const zoomOut = (e: any) => {
    e.preventDefault();
    map.setZoom(map.getZoom() - 1);
  };

  return (
    <div className="leaflet-control leaflet-bar custom-leaflet-control">
      <a
        className="leaflet-control-zoom-in"
        href="/"
        title="Zoom in"
        role="button"
        aria-label="Zoom in"
        onClick={zoomIn}>
        +
      </a>
      <a
        className="leaflet-control-zoom-out"
        href="/"
        title="Zoom out"
        role="button"
        aria-label="Zoom out"
        onClick={zoomOut}>
        −
      </a>
    </div>
  );
};

export default ZoomController;
