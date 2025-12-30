import React from 'react';
import { useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';

type Props = {
  sites?: any[];
  markerRefs: React.MutableRefObject<any[]>;
};

const SiteList: React.FC<Props> = ({ sites, markerRefs }) => {
  const map = useMap();

  const flyToLocation = (lat: number, lng: number, siteid: number) => {
    map.flyTo([lat, lng], 14);
    const marker = markerRefs.current[siteid];
    if (marker) {
      marker.openPopup();
    }
  };

  if (!sites || sites.length === 0) {
    return null;
  }

  return (
    <div className="site-list-wrapper mb-2">
      <ul className="side-nav">
        {sites?.map((item) => (
          <li key={item.site_id}>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                flyToLocation(
                  item.latitude,
                  item.longitude,
                  Number(item.site_id)
                );
              }}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteList;
