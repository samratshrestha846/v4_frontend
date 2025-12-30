import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import ReactDOM from 'react-dom';
import { FeatureCollection } from 'geojson';
import CeresTagPopUp from '../../../property/detail/map/ceresTag/CeresTagPopUp';

type Props = {
  ceresTagData: FeatureCollection | null;
  times: string[];
  timeSliderValue: number;
  ceresTagId: number | null | undefined;
  asOfFrom: any;
  asOfTo: any;
  setDisplaySelectedDate: any;
  cowIcon: any;
  ceresTagHide: boolean;
};

const CeresTagLayer: React.FC<Props> = ({
  ceresTagData,
  times,
  timeSliderValue,
  ceresTagId,
  asOfFrom,
  asOfTo,
  setDisplaySelectedDate,
  cowIcon,
  ceresTagHide,
}) => {
  const map = useMap();
  const [ceresCurrentLayer, setCeresCurrentLayer] = useState<any>(null); // Ceres Tag Layer that is being displayed in the map

  const getLocationOnSelectedDate = (
    data: FeatureCollection,
    selectedDate: string
  ) => {
    const cowLocations: { [key: number]: any } = {};
    const firstDates: { [key: number]: Date } = {};

    data.features.forEach((feature) => {
      const ceresTagID = feature.properties?.ceres_tag_id;
      const dateTime = feature.properties?.datetime;
      const featureDate = new Date(dateTime);
      const selectedFeatureDate = new Date(selectedDate);

      if (!firstDates[ceresTagID] || featureDate < firstDates[ceresTagID]) {
        firstDates[ceresTagID] = featureDate;
      }

      if (firstDates[ceresTagID] <= selectedFeatureDate) {
        if (!cowLocations[ceresTagID]) {
          cowLocations[ceresTagID] = feature;
        } else {
          const currentFeatureDate = new Date(
            cowLocations[ceresTagID].properties.datetime
          );

          if (
            (featureDate <= selectedFeatureDate &&
              featureDate > currentFeatureDate) ||
            (currentFeatureDate > selectedFeatureDate &&
              featureDate > selectedFeatureDate)
          ) {
            cowLocations[ceresTagID] = feature;
          }
        }
      }
    });

    return {
      type: 'FeatureCollection',
      features: Object.values(cowLocations),
    } as FeatureCollection;
  };

  useEffect(() => {
    if (ceresCurrentLayer) {
      map.removeLayer(ceresCurrentLayer);
    }

    if (ceresTagHide && ceresCurrentLayer) {
      map.removeLayer(ceresCurrentLayer);
      setCeresCurrentLayer(null);
      return;
    }

    if (ceresTagData && times && !ceresTagHide) {
      const selectedDate = times[timeSliderValue];
      setDisplaySelectedDate(selectedDate);

      const dataToDisplay = getLocationOnSelectedDate(
        ceresTagData,
        selectedDate
      );

      const filteredLayer = new L.GeoJSON(dataToDisplay, {
        pointToLayer: (feature, latlng) => {
          return new L.Marker(latlng, { icon: cowIcon });
        },
        onEachFeature: (feature: any, layer) => {
          if (feature.properties) {
            const div = document.createElement('div');
            ReactDOM.render(<CeresTagPopUp feature={feature} />, div);
            layer.bindPopup(div);
          }
        },
      });

      setCeresCurrentLayer(filteredLayer);
      filteredLayer.addTo(map);
    }
  }, [ceresTagId, timeSliderValue, asOfFrom, asOfTo, ceresTagHide]);

  return null;
};

export default CeresTagLayer;
