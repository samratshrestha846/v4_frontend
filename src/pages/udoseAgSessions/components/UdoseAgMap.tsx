import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Col, Row } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import Lft from 'leaflet';
import { mapMarkerIcon } from '../../../assets/icons';

type LocationProps = {
  latitude?: string;
  longitude?: string;
};

type Props = {
  deviceLocation?: LocationProps;
};

const UdoseAgMap: React.FC<Props> = ({ deviceLocation }) => {
  const defaultCenterCoordinates = { lat: -25.86944, lng: 135.04453 };

  const customIcon = new Lft.Icon({
    iconUrl: mapMarkerIcon,
    iconSize: [30, 30],
  });

  return (
    <Row>
      <Col>
        <div className="mt-2">
          <h5 className="text-primary">Location</h5>
          <MapContainer
            center={defaultCenterCoordinates}
            zoom={4}
            style={{ height: '50vh', width: '100%', maxHeight: 'none' }}>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Tiles &copy; Esri &mdash; Source: Esri"
            />
            {deviceLocation &&
              deviceLocation?.latitude &&
              deviceLocation?.longitude &&
              !Number.isNaN(Number(deviceLocation.latitude)) &&
              !Number.isNaN(Number(deviceLocation.longitude)) && (
                <Marker
                  key={`${deviceLocation.latitude}-${deviceLocation.longitude}`}
                  position={[
                    Number(deviceLocation.latitude),
                    Number(deviceLocation.longitude),
                  ]}
                  icon={customIcon}
                />
              )}
          </MapContainer>
        </div>
      </Col>
    </Row>
  );
};

export default UdoseAgMap;
