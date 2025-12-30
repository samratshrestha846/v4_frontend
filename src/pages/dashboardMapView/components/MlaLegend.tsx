import React from 'react';
import {
  layerLandOnlyStyle,
  layerStateAndCostalWaterStyle,
} from '../../../assets/gis/mlaLayerStyle';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

type Props = { loading?: boolean; error?: boolean };

const MlaLegend: React.FC<Props> = ({ loading, error }) => {
  const layers = [
    { name: 'Land Area Only', style: layerLandOnlyStyle },
    {
      name: 'State and Coastal Water',
      style: layerStateAndCostalWaterStyle,
    },
  ];

  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="nrm-legend">
      <h6 className="mt-0">Legend</h6>
      {layers.map((layer) => (
        <div key={layer.name}>
          <span>
            <i
              className="bx bxs-square me-1"
              style={{
                color: layer.style.fillColor,
              }}
            />
            {layer.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MlaLegend;
