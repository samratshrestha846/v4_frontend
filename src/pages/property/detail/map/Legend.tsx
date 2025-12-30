import React, { FC } from 'react';
import { MapData } from '../../../../types/property/mapLayer';
import { mapMarkerIcon } from '../../../../assets/icons';
import { capitalizeFirstLetter } from '../../../../helpers';

type Props = {
  geojsonLayers?: MapData[];
  siteLocations?: any[];
};

const Legend: FC<Props> = ({ geojsonLayers, siteLocations }) => {
  return (
    <div className="legend-wrapper">
      <h6>Legend</h6>
      <ul className="side-nav">
        {geojsonLayers &&
          geojsonLayers?.map((layer) => (
            <li key={`legend-${layer.layerData.id}`} className="side-nav-item">
              {layer.layerData.feature_type === 'Point' && (
                <div className="legend-content-wrapper">
                  {layer.layerData.style.style.html && (
                    <div
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: layer.layerData.style.style.html,
                      }}
                    />
                  )}
                  <span className="legend-content-title">
                    {capitalizeFirstLetter(layer.layerData.name)}
                  </span>
                </div>
              )}

              {(layer.layerData.feature_type === 'Line' ||
                layer.layerData.feature_type === 'line') && (
                <div className="legend-content-wrapper">
                  <div className="legend-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      stroke={layer.layerData.style?.style?.color}
                      strokeWidth={layer.layerData.style.style?.weight}>
                      <line x1="0" y1="0" x2="24" y2="24" />
                    </svg>
                  </div>
                  <span className="legend-content-title">
                    {capitalizeFirstLetter(layer.layerData.name)}
                  </span>
                </div>
              )}

              {layer.layerData.feature_type === 'Polygon' && (
                <div className="legend-content-wrapper">
                  <div className="legend-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill={layer.layerData.style.style?.fillColor}
                      fillOpacity={layer.layerData.style.style?.fillOpacity}
                      stroke={layer.layerData.style.style?.color}
                      strokeWidth={layer.layerData.style.style?.weight}>
                      <rect width="20" height="20" x="2" y="2" rx="2" ry="2" />
                    </svg>
                  </div>
                  <span className="legend-content-title">
                    {capitalizeFirstLetter(layer.layerData.name)}
                  </span>
                </div>
              )}
            </li>
          ))}
        {siteLocations && siteLocations?.length > 0 && (
          <li className="side-nav-item" key="legend-doser">
            <div className="legend-content-wrapper">
              <div className="legend-icon">
                <img src={mapMarkerIcon} alt="Doser" width="16px" />
              </div>
              <span
                className="legend-content-title "
                style={{ marginLeft: '3px' }}>
                Doser
              </span>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Legend;
