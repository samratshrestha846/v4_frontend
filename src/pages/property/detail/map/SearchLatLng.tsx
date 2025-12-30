import React, { useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { toast } from 'react-toastify';
import { searchLocationIcon } from '../../../../assets/icons';

const SearchLatLng = () => {
  const customIcon = new L.Icon({
    iconUrl: searchLocationIcon,
    iconSize: [30, 30],
  });
  const [boxText, setBoxText] = useState('');
  const [coordinate, setCoordinate] = useState<[number, number]>();

  const map = useMap();

  const handleBoxTextChange = (event: any) => {
    setBoxText(event.target.value);
  };

  const handleClearButton = () => {
    setBoxText('');
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const regex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    if (!regex.test(boxText)) {
      toast.info('Please enter correct Latitude and Longitude');
      return;
    }

    const [myLat, myLng] = boxText
      .split(',')
      .map((coord: any) => parseFloat(coord.trim()));

    setCoordinate([myLat, myLng]);

    map.flyTo([myLat, myLng], map.getZoom());
  };

  return (
    <div className="map-search noprint">
      <form className="leaflet-control search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Latitude, Longitude"
          value={boxText}
          onChange={handleBoxTextChange}
        />
        {boxText === '' && ( // Conditional rendering of the search button
          <button className="btn btn-sm btn-icon map-search-icon" type="submit">
            <i className="bx bx-search-alt" />
          </button>
        )}

        {boxText !== '' && (
          <button
            type="button"
            className="btn-icon map-search-icon"
            onClick={handleClearButton}>
            <i className="bx bx-x" />
          </button>
        )}
      </form>

      {coordinate ? <Marker position={coordinate} icon={customIcon} /> : null}
    </div>
  );
};

export default SearchLatLng;
