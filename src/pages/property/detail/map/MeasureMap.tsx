import { LatLng } from 'leaflet';
import React from 'react';
import { FeatureGroup } from 'react-leaflet';
import { DraftControl } from 'react-leaflet-draft';
import * as turf from '@turf/turf';

const MeasureMap = () => {
  // Calculate distance of the line drawn
  const calculatePolylineLength = (latLngs: LatLng[]) => {
    let length = 0;

    latLngs.forEach((item, index) => {
      if (index > 0) {
        length += latLngs[index - 1].distanceTo(item);
      }
    });

    return length.toFixed(2);
  };

  // Calculate area of the polygon drawn
  const calculatePolygonArea = (layer: any) => {
    const area = turf.area(layer.toGeoJSON()) * 0.0001;
    return area.toFixed(3);
  };

  const handleCreated = (e: any) => {
    if (e.layerType === 'polyline') {
      const length: number = parseFloat(
        calculatePolylineLength(e.layer.getLatLngs())
      );
      let content;
      if (length > 1000) {
        const lengthInKm = length / 1000;
        content = `Distance: ${lengthInKm.toFixed(2)} Kilometers`;
      } else {
        content = `Distance: ${length} meters`;
      }
      e.layer.bindPopup(content).openPopup();
    } else {
      const area = calculatePolygonArea(e.layer);
      const content = `Area: ${area} Hectares`;
      e.layer.bindPopup(content).openPopup();
    }
  };

  return (
    <div>
      <FeatureGroup>
        <DraftControl
          draw={{
            circle: false,
            rectangle: false,
          }}
          edit={{
            edit: false,
          }}
          onCreated={handleCreated}
        />
      </FeatureGroup>
    </div>
  );
};

export default MeasureMap;
