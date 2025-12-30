import React, { useState } from 'react';
import { Popup, useMap, Circle, CircleMarker } from 'react-leaflet';

const MyLocation = () => {
  const [position, setPosition] = useState<[number, number]>();
  const [showMarker, setShowMarker] = useState(false);
  const [accuracy, setAccuracy] = useState<number>();

  const map = useMap();

  // styling for circle symbol live location
  const innerCircle = { color: 'white', fillColor: 'blue' };
  const outerCircle = { color: 'blue' };

  const handleButtonClick = () => {
    setShowMarker(true);
    navigator.geolocation.getCurrentPosition((myposition) => {
      setPosition([myposition.coords.latitude, myposition.coords.longitude]);
      setAccuracy(myposition.coords.accuracy);
      map.flyTo([myposition.coords.latitude, myposition.coords.longitude], 14);
    });
  };

  return (
    <>
      <div className="leaflet-control current-location noprint leaftlet-bar">
        <button
          type="button"
          className="leaflet-control search"
          onClick={handleButtonClick}>
          <i className="bx bx-current-location" />
        </button>
      </div>
      {showMarker && position && accuracy && (
        <>
          <Circle
            center={position}
            pathOptions={outerCircle}
            radius={accuracy}
          />
          <CircleMarker center={position} pathOptions={innerCircle} radius={10}>
            <Popup>
              You are around {accuracy?.toFixed(2)} meters from this point
            </Popup>
          </CircleMarker>
        </>
      )}
    </>
  );
};

export default MyLocation;
