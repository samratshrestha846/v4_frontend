import React from 'react';
import { FeatureGroup } from 'react-leaflet';
import DoserMarker from '../../property/detail/map/DoserMarker';

type Props = {
  siteLocations: any;
  runningIsHide: boolean;
  stoppedIsHide: boolean;
  alarmedIsHide: boolean;
  markerRefs: React.MutableRefObject<any[]>;
};

const StationData: React.FC<Props> = ({
  siteLocations,
  runningIsHide,
  stoppedIsHide,
  alarmedIsHide,
  markerRefs,
}) => {
  const filterMarkers = (marker: any) => {
    if (!runningIsHide && !stoppedIsHide && !alarmedIsHide) return true;

    if (runningIsHide && marker.status === 'Running') return false;
    if (stoppedIsHide && marker.status === 'Stopped') return false;
    if (
      alarmedIsHide &&
      marker.status !== 'Running' &&
      marker.status !== 'Stopped'
    )
      return false;

    return true;
  };

  return (
    <FeatureGroup>
      {siteLocations
        ?.filter(filterMarkers)
        .map((marker: any) => (
          <DoserMarker
            key={marker?.site_id}
            marker={marker}
            markerRefs={markerRefs}
          />
        ))}
    </FeatureGroup>
  );
};

export default StationData;
