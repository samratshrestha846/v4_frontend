/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, Button } from 'react-bootstrap';
import Lft from 'leaflet';
import { Device } from '../../../types/device/device';
import { mapMarkerIcon } from '../../../assets/icons';
import { formattedDate } from '../../../helpers';

const defaultCenterCoordinates = { lat: -25.86944, lng: 135.04453 };

type ReactLeafletProps = {
  device: Device | undefined;
  updateLocation: (id: number) => void;
};

const DeviceLocation = ({ device, updateLocation }: ReactLeafletProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { id, latitude, longitude, location_updated_at } = device!;

  const zoomVal = latitude && longitude ? 5 : 9;

  const centerLatLng =
    latitude && longitude
      ? { lat: latitude, lng: longitude }
      : defaultCenterCoordinates;
  const customIcon = new Lft.Icon({
    iconUrl: mapMarkerIcon,
    iconSize: [30, 30],
  });

  const copyCoordinate = () => {
    const coordinate = `${Number(latitude).toFixed(5)},${Number(longitude).toFixed(5)}`;
    navigator.clipboard.writeText(coordinate).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <Card>
      <Card.Header className="text-primary-color d-flex justify-content-between align-items-center">
        <h5>Device Last Location</h5>
        <div className="d-flex justify-content-end align-items-center gap-3">
          {latitude && longitude && (
            <div className="d-flex align-items-center">
              <p className="fw-bold font-12 text-black-50 m-0">
                GPS Location:{' '}
                <span className="text-black">
                  {Number(latitude).toFixed(5)}
                  {', '} {Number(longitude).toFixed(5)}
                </span>
              </p>

              <Button
                onClick={() => {
                  copyCoordinate();
                }}
                className="ms-1 p-0"
                type="Button"
                variant="link">
                {!isCopied ? (
                  <i className="mdi mdi-content-copy ms-1" />
                ) : (
                  <i className="mdi mdi-check-circle-outline ms-1">Copied</i>
                )}
              </Button>
            </div>
          )}
          <div className="d-flex flex-column gap-1">
            <Button
              onClick={() => updateLocation(id)}
              className="btn btn-outline-secondary btn-sm">
              <i className="bx bx-map-pin me-1" /> Fetch Location
            </Button>
            {location_updated_at && (
              <p className="fw-normal font-12 text-black-50 mb-0">
                <i className="bx bx-info-circle " /> Last updated:{' '}
                {formattedDate(location_updated_at)}
              </p>
            )}
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <MapContainer
          center={centerLatLng}
          zoom={zoomVal}
          style={{ height: '35vh', width: '100%' }}>
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Tiles &copy; Esri &mdash; Source: Esri"
          />
          {latitude && longitude && (
            <Marker position={[latitude, longitude]} icon={customIcon}>
              <Popup>
                <span>{device?.serial_number}</span>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </Card.Body>
    </Card>
  );
};

export default DeviceLocation;
