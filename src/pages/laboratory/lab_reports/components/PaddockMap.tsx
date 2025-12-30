import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Col, Row } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import Lft from 'leaflet';
import { mapMarkerIcon } from '../../../../assets/icons';
import { LabSample } from '../../../../types/lab/labSampleList';

type Props = {
  labSamples?: LabSample[];
};

const PaddockMap: React.FC<Props> = ({ labSamples }) => {
  const defaultCenterCoordinates = { lat: -25.86944, lng: 135.04453 };

  const customIcon = new Lft.Icon({
    iconUrl: mapMarkerIcon,
    iconSize: [30, 30],
  });

  return (
    <Row>
      <Col>
        <div className="mt-3">
          <h5 className="text-primary">Map</h5>
          <MapContainer
            center={defaultCenterCoordinates}
            zoom={4}
            style={{ height: '40vh', width: '100%', maxHeight: 'none' }}>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Tiles &copy; Esri &mdash; Source: Esri"
            />
            {labSamples?.map(
              (labSample) =>
                labSample?.latitude &&
                labSample?.longitude &&
                !Number.isNaN(Number(labSample?.latitude)) &&
                !Number.isNaN(Number(labSample?.longitude)) && (
                  <Marker
                    key={labSample?.id}
                    position={[
                      Number(labSample?.latitude),
                      Number(labSample?.longitude),
                    ]}
                    icon={customIcon}>
                    <Popup>
                      <span>{labSample?.paddock ?? 'Paddock Name'}</span>
                    </Popup>
                  </Marker>
                )
            )}
          </MapContainer>
        </div>
      </Col>
    </Row>
  );
};

export default PaddockMap;
